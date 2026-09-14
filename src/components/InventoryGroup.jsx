// src\components\InventoryGroup.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "./utils/supabaseClient";
import InventoryPopup from "./popup/InventoryPopup";
import "../css/InventoryGroup.css";

const createSlug = (value = "") => {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export default function InventoryGroup() {
  const navigate = useNavigate();
  const { groupSlug } = useParams();

  const [items, setItems] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const loadItems = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase.from("inventory_items").select("*").order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      const allItems = Array.isArray(data) ? data : [];

      const matchedItems = allItems.filter((item) => createSlug(item?.group_name) === groupSlug);

      setItems(matchedItems);
      setGroupName(matchedItems[0]?.group_name || "");
    } catch (error) {
      console.error("❌ LỖI LOAD NHÓM VẬT TƯ:", error);
      setItems([]);
      setGroupName("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [groupSlug]);

  useEffect(() => {
    const handleDataChanged = () => {
      loadItems();
    };

    window.addEventListener("supabase-data-changed", handleDataChanged);

    return () => {
      window.removeEventListener("supabase-data-changed", handleDataChanged);
    };
  }, [groupSlug]);

  const normalizedSearch = String(searchTerm || "")
    .trim()
    .toLowerCase();

  const filteredItems = useMemo(() => {
    if (!normalizedSearch) {
      return items;
    }

    return items.filter((item) => {
      const name = String(item?.name || "").toLowerCase();

      return name.includes(normalizedSearch);
    });
  }, [items, normalizedSearch]);

  const handleOpenAddPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSavePopup = async (formData) => {
    try {
      const payload = {
        group_name: formData.group_name,
        category: formData.category,
        name: formData.name,
        image_url: formData.image_url,
        purchase_decision: formData.purchase_decision,
        purchase_price: formData.purchase_price,
        purchase_date: formData.purchase_date,
        quantity: formData.quantity,
        unit: formData.unit,
        expiry_date: formData.expiry_date,
        estimated_uses: formData.estimated_uses,
        used_count: formData.used_count ?? 0,
        warranty_months: formData.warranty_months,
        size: formData.size,
        color: formData.color,
        condition: formData.condition,
        note: formData.note,
      };

      const { error } = await supabase.from("inventory_items").insert(payload);

      if (error) {
        throw error;
      }

      await loadItems();

      window.dispatchEvent(new CustomEvent("supabase-data-changed"));

      return {
        success: true,
      };
    } catch (error) {
      console.error("❌ LỖI THÊM VẬT TƯ:", error);

      return {
        success: false,
        error,
      };
    }
  };

  return (
    <div className="inventory-group">
      <div
        className="inventory-group-header"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <button type="button" className="inventory-back-btn" onClick={() => navigate("/more")}>
          ←
        </button>

        <div
          className="inventory-group-title"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flex: 1,
          }}
        >
         
          <strong>{groupName || "Vật tư"}</strong>
        </div>

        <button type="button" className="inventory-add-btn" onClick={handleOpenAddPopup}>
          +
        </button>
      </div>

      <div className="inventory-search">
        <span>⌕</span>

        <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Tìm tên hoặc mã..." />
      </div>

      <div className="inventory-list">
        {loading ? (
          <div className="inventory-empty">
            <span>Đang tải vật tư...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="inventory-empty">
            <span>{normalizedSearch ? "Không tìm thấy vật tư" : "Chưa có vật tư"}</span>
          </div>
        ) : (
          filteredItems.map((item, index) => {
            const imageUrl = item?.image_url || "";

            return (
              <div className="inventory-card" key={item?.id || `inventory-${index}`}>
                <div className="inventory-card-main">
                  <div className="inventory-info">
                    <div className="inventory-row inventory-name">{item?.name || "Chưa có tên"}</div>

                    <div className="inventory-row">
                      <span>Mã: </span>
                      <strong>{item?.name || "Chưa có mã"}</strong>
                    </div>

                    <div className="inventory-row">
                      <span>Ngành hàng: </span>
                      <strong>{item?.category || "Chưa cập nhật"}</strong>
                    </div>

                    <div className="inventory-row">
                      <span>Số lượng: </span>
                      <strong>
                        {item?.quantity ?? 0} {item?.unit || ""}
                      </strong>
                    </div>
                  </div>

                  <div className="inventory-image-box">
                    {imageUrl ? (
                      <img src={imageUrl} alt={item?.name || "Vật tư"} className="inventory-image" />
                    ) : (
                      <div className="inventory-image-empty">🖼️</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {isPopupOpen && <InventoryPopup onClose={handleClosePopup} onSave={handleSavePopup} initialData={null} />}
    </div>
  );
}
