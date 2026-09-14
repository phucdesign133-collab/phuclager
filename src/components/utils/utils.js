// ==========================================
// UTILS.JS - CÁC HÀM TIỆN ÍCH DÙNG CHUNG
// ==========================================

import { supabase } from "./supabaseClient";

export const formatCurrency = (amount) => {
  if (isNaN(amount) || amount === null) return "0 ₫";

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export function getCurrentDateFormatted() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export const getDaysInCurrentMonth = (year, month) => {
  const now = new Date();

  const targetYear = year || now.getFullYear();
  const targetMonth = month !== undefined ? month : now.getMonth();

  const totalDays = new Date(targetYear, targetMonth + 1, 0).getDate();

  const daysList = [];

  for (let i = 1; i <= totalDays; i++) {
    const dayStr = String(i).padStart(2, "0");
    const monthStr = String(targetMonth + 1).padStart(2, "0");

    daysList.push({
      dateString: `${targetYear}-${monthStr}-${dayStr}`,
      dayNumber: i,
      display: `${dayStr}/${monthStr}`,
    });
  }

  return daysList;
};

export const maskPhoneNumber = (phone) => {
  if (!phone || phone.length < 6) return phone;

  const start = phone.slice(0, 2);
  const end = phone.slice(-2);
  const maskedMiddle = "*".repeat(phone.length - 4);

  return `${start}${maskedMiddle}${end}`;
};

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Lỗi khi lưu LocalStorage:", error);
  }
};

export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Lỗi khi đọc LocalStorage:", error);

    return defaultValue;
  }
};

export const exportLocalStorageToJson = () => {
  const data = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    data[key] = JSON.parse(localStorage.getItem(key));
  }

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));

  const downloadAnchor = document.createElement("a");

  downloadAnchor.setAttribute("href", dataStr);

  downloadAnchor.setAttribute("download", `backup_data_${getCurrentDateFormatted()}.json`);

  document.body.appendChild(downloadAnchor);

  downloadAnchor.click();
  downloadAnchor.remove();
};

export const uploadImagesToStorage = async (files = [], folder = "uploads") => {
  const validFiles = files.filter((file) => file instanceof File);

  if (!validFiles.length) {
    return [];
  }

  const uploadedUrls = [];

  for (const file of validFiles) {
    const extension = file.name.includes(".") ? file.name.split(".").pop().toLowerCase() : "jpg";

    const fileName = `${crypto.randomUUID()}.${extension}`;

    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage.from("images").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "image/jpeg",
    });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from("images").getPublicUrl(filePath);

    if (!data?.publicUrl) {
      throw new Error("Không lấy được URL hình ảnh.");
    }

    uploadedUrls.push(data.publicUrl);
  }

  return uploadedUrls;
};
