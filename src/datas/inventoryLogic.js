// src\datas\inventoryLogic.js
export const ONE_DOLLAR_VND = 23000;

export const normalizeText = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export const normalizeGroup = (value = "") => String(value).trim();

export const normalizeCategory = (value = "") => String(value).trim();

export const normalizeName = (value = "") => String(value).trim();

export const getGroups = (items = []) => {
  return [...new Set(items.map((item) => normalizeGroup(item?.group_name)).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "vi", { sensitivity: "base" }),
  );
};

export const hasItemsInGroup = (items = [], group = "") => {
  const target = normalizeText(group);

  return items.some((item) => normalizeText(item?.group_name) === target);
};

export const getItemsByGroup = (items = [], group = "") => {
  const target = normalizeText(group);

  return items.filter((item) => normalizeText(item?.group_name) === target);
};

export const searchItems = (items = [], keyword = "") => {
  const query = normalizeText(keyword);

  if (!query) return items;

  return items.filter((item) => {
    const name = normalizeText(item?.name);
    const category = normalizeText(item?.category);

    return name.includes(query) || category.includes(query);
  });
};

export const BASE_FIELDS = ["group", "category", "name"];

export const FOOD_FIELDS = ["quantity", "unit", "expiry_date", "purchase_price", "purchase_date", "note"];

export const ITEM_FIELDS = ["purchase_price", "purchase_date", "estimated_uses", "used_count", "warranty_months", "note"];

export const CLOTHING_FIELDS = ["size", "color", "purchase_price", "purchase_date", "used_count", "condition", "note"];

const FOOD_KEYWORDS = [
  "do an",
  "do uong",
  "mi",
  "mi goi",
  "gao",
  "thuc pham",
  "bánh",
  "banh",
  "keo",
  "kẹo",
  "trai cay",
  "trái cây",
  "rau",
  "thit",
  "thịt",
  "ca",
  "cá",
  "nuoc",
  "nước",
  "sua",
  "sữa",
  "cafe",
  "cà phê",
  "tra",
  "trà",
  "do an",
  "đồ ăn",
  "do uong",
  "đồ uống",
];

const CLOTHING_KEYWORDS = [
  "trang phuc",
  "trang phục",
  "quan ao",
  "quần áo",
  "ao",
  "áo",
  "quan",
  "quần",
  "vay",
  "váy",
  "dam",
  "đầm",
  "giay",
  "giày",
  "dep",
  "dép",
  "mu",
  "mũ",
  "non",
  "nón",
  "dong phuc",
  "đồng phục",
  "costume",
  "clothing",
];

const ITEM_KEYWORDS = [
  "thiet bi",
  "thiết bị",
  "dien tu",
  "điện tử",
  "dien thoai",
  "điện thoại",
  "laptop",
  "may tinh",
  "máy tính",
  "may chieu",
  "máy chiếu",
  "camera",
  "micro",
  "loa",
  "tai nghe",
  "tai nghe",
  "phu kien",
  "phụ kiện",
  "van phong pham",
  "văn phòng phẩm",
  "dung cu",
  "dụng cụ",
  "do dung",
  "đồ dùng",
  "may",
  "máy",
  "cap",
  "cáp",
  "sac",
  "sạc",
  "pin",
  "usb",
];

const containsKeyword = (text, keywords) => {
  return keywords.some((keyword) => text.includes(normalizeText(keyword)));
};

export const getInventoryType = ({ group = "", category = "" } = {}) => {
  const source = normalizeText(`${group} ${category}`);

  if (containsKeyword(source, FOOD_KEYWORDS)) {
    return "food";
  }

  if (containsKeyword(source, CLOTHING_KEYWORDS)) {
    return "clothing";
  }

  if (containsKeyword(source, ITEM_KEYWORDS)) {
    return "item";
  }

  return "item";
};

export const getFieldsByCategory = ({ group = "", category = "" } = {}) => {
  const type = getInventoryType({
    group,
    category,
  });

  if (type === "food") {
    return FOOD_FIELDS;
  }

  if (type === "clothing") {
    return CLOTHING_FIELDS;
  }

  return ITEM_FIELDS;
};

export const calculateEstimatedUses = ({ purchasePrice = 0, oneDollarVnd = ONE_DOLLAR_VND } = {}) => {
  const price = Number(purchasePrice) || 0;

  if (price <= 0) return 0;

  return Math.ceil(price / oneDollarVnd);
};

export const calculateRemainingUses = ({ estimatedUses = 0, usedCount = 0 } = {}) => {
  const estimated = Number(estimatedUses) || 0;
  const used = Number(usedCount) || 0;

  return Math.max(estimated - used, 0);
};

export const calculateUsageData = (item = {}) => {
  const estimatedUses =
    Number(item.estimated_uses) ||
    calculateEstimatedUses({
      purchasePrice: item.purchase_price,
    });

  const usedCount = Number(item.used_count) || 0;

  return {
    estimatedUses,
    usedCount,
    remainingUses: calculateRemainingUses({
      estimatedUses,
      usedCount,
    }),
  };
};

export const normalizePurchaseDecision = (value = "") => {
  if (value === "Mua sai") return "Mua sai";
  if (value === "Mua đúng") return "Mua đúng";

  return "";
};

export const getPurchasePriority = (item = {}) => {
  return item.purchase_decision === "Mua sai" ? 1 : 0;
};

export const getExpiryPriority = (item = {}) => {
  if (!item.expiry_date) return Number.MAX_SAFE_INTEGER;

  const date = new Date(item.expiry_date).getTime();

  if (Number.isNaN(date)) {
    return Number.MAX_SAFE_INTEGER;
  }

  return date;
};

export const getBreakEvenPriority = (item = {}) => {
  const { estimatedUses, usedCount } = calculateUsageData(item);

  if (!estimatedUses) {
    return Number.MAX_SAFE_INTEGER;
  }

  return Math.max(estimatedUses - usedCount, 0);
};

export const getSortScore = (item = {}, sortBy = "newest") => {
  if (sortBy === "price") {
    return Number(item.purchase_price) || 0;
  }

  if (sortBy === "expiry") {
    return getExpiryPriority(item);
  }

  if (sortBy === "breakEven") {
    return getBreakEvenPriority(item);
  }

  if (sortBy === "usedMost") {
    return -(Number(item.used_count) || 0);
  }

  if (sortBy === "usedLeast") {
    return Number(item.used_count) || 0;
  }

  if (sortBy === "oldest") {
    return new Date(item.purchase_date || item.created_at || 0).getTime();
  }

  return -new Date(item.purchase_date || item.created_at || 0).getTime();
};

export const sortInventoryItems = (items = [], sortBy = "newest") => {
  return [...items].sort((a, b) => {
    const purchasePriorityA = getPurchasePriority(a);

    const purchasePriorityB = getPurchasePriority(b);

    if (purchasePriorityA !== purchasePriorityB) {
      return purchasePriorityA - purchasePriorityB;
    }

    return getSortScore(a, sortBy) - getSortScore(b, sortBy);
  });
};

export const prepareInventoryList = (items = [], options = {}) => {
  const { keyword = "", group = "", sortBy = "newest" } = options;

  let result = [...items];

  if (group) {
    result = getItemsByGroup(result, group);
  }

  if (keyword) {
    result = searchItems(result, keyword);
  }

  return sortInventoryItems(result, sortBy);
};

export const prepareInventoryItem = (item = {}) => {
  const usage = calculateUsageData(item);

  return {
    ...item,
    group_name: normalizeGroup(item.group_name),
    category: normalizeCategory(item.category),
    name: normalizeName(item.name),
    purchase_decision: normalizePurchaseDecision(item.purchase_decision),
    estimated_uses: usage.estimatedUses,
    used_count: usage.usedCount,
    remaining_uses: usage.remainingUses,
  };
};

export const validateBaseInventoryItem = (item = {}) => {
  if (!normalizeGroup(item.group_name)) {
    return {
      valid: false,
      message: "Vui lòng nhập Nhóm.",
    };
  }

  if (!normalizeCategory(item.category)) {
    return {
      valid: false,
      message: "Vui lòng nhập Ngành hàng.",
    };
  }

  if (!normalizeName(item.name)) {
    return {
      valid: false,
      message: "Vui lòng nhập Tên.",
    };
  }

  return {
    valid: true,
    message: "",
  };
};

export const getDisplayValue = (value, fallback = "-") => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return String(value);
};
