import React, { useEffect, useRef, useState } from "react";
import "../../css/Popup.css";
import { getInventoryType, getFieldsByCategory, calculateEstimatedUses } from "../../datas/inventoryLogic";
import { uploadImagesToStorage } from "../utils/utils";

const formatMoney = (value) => {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  const number = String(value).replace(/\D/g, "");

  if (!number) return "";

  return Number(number).toLocaleString("vi-VN");
};

const parseMoney = (value) => {
  if (!value) return null;

  const number = String(value).replace(/\D/g, "");

  return number ? Number(number) : null;
};

export default function InventoryPopup({ onClose, onSave, initialData = null }) {
  const isEditing = Boolean(initialData);

  const fileInputRef = useRef(null);

  const [groupName, setGroupName] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [purchaseDecision, setPurchaseDecision] = useState("");

  const [purchasePrice, setPurchasePrice] = useState("");

  const [purchaseDate, setPurchaseDate] = useState("");

  const [quantity, setQuantity] = useState("");

  const [unit, setUnit] = useState("");

  const [expiryDate, setExpiryDate] = useState("");

  const [estimatedUses, setEstimatedUses] = useState("");

  const [usedCount, setUsedCount] = useState("");

  const [warrantyMonths, setWarrantyMonths] = useState("");

  const [size, setSize] = useState("");

  const [color, setColor] = useState("");

  const [condition, setCondition] = useState("");

  const [note, setNote] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  const inventoryType = getInventoryType({
    group: groupName,
    category,
  });

  const dynamicFields = getFieldsByCategory({
    group: groupName,
    category,
  });

  const hasBaseData = groupName.trim() && category.trim() && name.trim();

  const hasDynamicFields = Boolean(hasBaseData) && dynamicFields.length > 0;

  useEffect(() => {
    if (!initialData) {
      setGroupName("");
      setCategory("");
      setName("");

      setImageUrl("");
      setImageFile(null);

      setPurchaseDecision("");
      setPurchasePrice("");
      setPurchaseDate("");

      setQuantity("");
      setUnit("");
      setExpiryDate("");

      setEstimatedUses("");
      setUsedCount("");

      setWarrantyMonths("");

      setSize("");
      setColor("");
      setCondition("");

      setNote("");

      return;
    }

    setGroupName(initialData.group_name || "");

    setCategory(initialData.category || "");

    setName(initialData.name || "");

    setImageUrl(initialData.image_url || "");

    setImageFile(null);

    setPurchaseDecision(initialData.purchase_decision || "");

    setPurchasePrice(initialData.purchase_price !== null && initialData.purchase_price !== undefined ? formatMoney(initialData.purchase_price) : "");

    setPurchaseDate(initialData.purchase_date || "");

    setQuantity(initialData.quantity !== null && initialData.quantity !== undefined ? String(initialData.quantity) : "");

    setUnit(initialData.unit || "");

    setExpiryDate(initialData.expiry_date || "");

    setEstimatedUses(initialData.estimated_uses !== null && initialData.estimated_uses !== undefined ? String(initialData.estimated_uses) : "");

    setUsedCount(initialData.used_count !== null && initialData.used_count !== undefined ? String(initialData.used_count) : "");

    setWarrantyMonths(initialData.warranty_months !== null && initialData.warranty_months !== undefined ? String(initialData.warranty_months) : "");

    setSize(initialData.size || "");

    setColor(initialData.color || "");

    setCondition(initialData.condition || "");

    setNote(initialData.note || "");
  }, [initialData]);

  const handleCategoryChange = (event) => {
    const value = event.target.value;

    setCategory(value);

    setQuantity("");
    setUnit("");
    setExpiryDate("");
    setEstimatedUses("");
    setUsedCount("");
    setWarrantyMonths("");
    setSize("");
    setColor("");
    setCondition("");
    setNote("");
  };

  const handlePurchasePriceChange = (event) => {
    const formatted = formatMoney(event.target.value);

    setPurchasePrice(formatted);

    if (inventoryType === "item" && formatted !== "" && !isEditing) {
      const calculated = calculateEstimatedUses({
        purchasePrice: parseMoney(formatted),
      });

      setEstimatedUses(calculated > 0 ? String(calculated) : "");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file hình ảnh.");
      event.target.value = "";
      return;
    }

    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);

    setImageUrl(previewUrl);

    event.target.value = "";
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImageUrl("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSaving) return;

    if (!groupName.trim()) {
      alert("Vui lòng nhập Nhóm.");
      return;
    }

    if (!category.trim()) {
      alert("Vui lòng nhập Ngành hàng.");
      return;
    }

    if (!name.trim()) {
      alert("Vui lòng nhập Tên.");
      return;
    }

    if (!hasDynamicFields) {
      return;
    }

    if (typeof onSave !== "function") {
      alert("Không thể lưu vật tư.");
      return;
    }

    setIsSaving(true);

    try {
      let finalImageUrl = imageFile ? null : imageUrl || null;

      if (imageFile) {
        const uploadedImages = await uploadImagesToStorage([imageFile], "uploads");

        finalImageUrl = uploadedImages[0] || null;
      }

      const formData = {
        id: initialData?.id || null,

        group_name: groupName.trim(),

        category: category.trim(),

        name: name.trim(),

        image_url: finalImageUrl,

        purchase_decision: isEditing ? purchaseDecision || null : null,

        purchase_price: parseMoney(purchasePrice),

        purchase_date: purchaseDate || null,

        quantity: inventoryType === "food" && quantity !== "" ? Number(quantity) : null,

        unit: inventoryType === "food" ? unit.trim() || null : null,

        expiry_date: inventoryType === "food" ? expiryDate || null : null,

        estimated_uses: inventoryType === "item" && estimatedUses !== "" ? Number(estimatedUses) : null,

        used_count: inventoryType !== "food" && usedCount !== "" ? Number(usedCount) : 0,

        warranty_months: inventoryType === "item" && warrantyMonths !== "" ? Number(warrantyMonths) : null,

        size: inventoryType === "clothing" ? size.trim() || null : null,

        color: inventoryType === "clothing" ? color.trim() || null : null,

        condition: inventoryType === "clothing" ? condition.trim() || null : null,

        note: note.trim() || null,
      };

      const result = await onSave(formData);

      if (!result || result.success !== true) {
        throw result?.error || new Error("Không thể lưu vật tư.");
      }

      onClose();
    } catch (error) {
      console.error("❌ InventoryPopup save error:", error);

      alert(`Không thể lưu vật tư:\n${error?.message || "Lỗi không xác định"}`);
    } finally {
      setIsSaving(false);
    }
  };

  const inputStyle = {
    backgroundColor: "#ffffff",
    color: "#222222",
    colorScheme: "light",
    WebkitTextFillColor: "#222222",
  };

  const renderImageField = () => {
    if (!hasBaseData) {
      return null;
    }

    return (
      <div className="popup-row">
        <label className="popup-label">Ảnh</label>

        <div
          style={{
            width: "100%",
          }}
        >
          {imageUrl ? (
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1 / 1",
                maxWidth: "260px",
                margin: "0 auto 10px",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#f2f2f2",
              }}
            >
              <img
                src={imageUrl}
                alt={name || "Vật tư"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={isSaving}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  width: "32px",
                  height: "32px",
                  border: "none",
                  borderRadius: "50%",
                  backgroundColor: "rgba(0,0,0,0.65)",
                  color: "#ffffff",
                  fontSize: "20px",
                  lineHeight: "32px",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                maxWidth: "260px",
                margin: "0 auto 10px",
                borderRadius: "12px",
                border: "1px dashed #bbb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#777",
                backgroundColor: "#f8f8f8",
              }}
            >
              Chưa có hình ảnh
            </div>
          )}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isSaving}
            style={{
              width: "100%",
              minHeight: "44px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              color: "#222222",
              cursor: "pointer",
            }}
          >
            {imageUrl ? "📷 Đổi ảnh" : "📷 Chụp / chọn ảnh"}
          </button>

          <input ref={fileInputRef} type="file" accept="image/*" capture="environment" className="popup-file-input" onChange={handleImageChange} />
        </div>
      </div>
    );
  };

  const renderDynamicFields = () => {
    if (!hasBaseData) {
      return null;
    }

    if (inventoryType === "food") {
      return (
        <>
          <div className="popup-row">
            <label className="popup-label">Số lượng</label>

            <input
              className="popup-input"
              style={inputStyle}
              type="number"
              min="0"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              disabled={isSaving}
            />
          </div>

          <div className="popup-row">
            <label className="popup-label">Đơn vị</label>

            <input
              className="popup-input"
              style={inputStyle}
              placeholder="Gói, hộp, chai..."
              value={unit}
              onChange={(event) => setUnit(event.target.value)}
              disabled={isSaving}
            />
          </div>

          <div className="popup-row">
            <label className="popup-label">Hạn sử dụng</label>

            <input
              className="popup-input"
              style={inputStyle}
              type="date"
              value={expiryDate}
              onChange={(event) => setExpiryDate(event.target.value)}
              disabled={isSaving}
            />
          </div>

          <div className="popup-row">
            <label className="popup-label">Giá mua</label>

            <input
              className="popup-input"
              style={inputStyle}
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={purchasePrice}
              onChange={handlePurchasePriceChange}
              disabled={isSaving}
            />
          </div>

          <div className="popup-row">
            <label className="popup-label">Ngày mua</label>

            <input
              className="popup-input"
              style={inputStyle}
              type="date"
              value={purchaseDate}
              onChange={(event) => setPurchaseDate(event.target.value)}
              disabled={isSaving}
            />
          </div>

          <div className="popup-row">
            <label className="popup-label">Ghi chú</label>

            <textarea className="popup-input" style={inputStyle} value={note} onChange={(event) => setNote(event.target.value)} disabled={isSaving} />
          </div>
        </>
      );
    }

    if (inventoryType === "clothing") {
      return (
        <>
          <div className="popup-row">
            <label className="popup-label">Size</label>

            <input
              className="popup-input"
              style={inputStyle}
              placeholder="S, M, L, XL..."
              value={size}
              onChange={(event) => setSize(event.target.value)}
              disabled={isSaving}
            />
          </div>

          <div className="popup-row">
            <label className="popup-label">Màu</label>

            <input className="popup-input" style={inputStyle} value={color} onChange={(event) => setColor(event.target.value)} disabled={isSaving} />
          </div>

          <div className="popup-row">
            <label className="popup-label">Giá mua</label>

            <input
              className="popup-input"
              style={inputStyle}
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={purchasePrice}
              onChange={handlePurchasePriceChange}
              disabled={isSaving}
            />
          </div>

          <div className="popup-row">
            <label className="popup-label">Ngày mua</label>

            <input
              className="popup-input"
              style={inputStyle}
              type="date"
              value={purchaseDate}
              onChange={(event) => setPurchaseDate(event.target.value)}
              disabled={isSaving}
            />
          </div>

          <div className="popup-row">
            <label className="popup-label">Đã dùng</label>

            <input
              className="popup-input"
              style={inputStyle}
              type="number"
              min="0"
              value={usedCount}
              onChange={(event) => setUsedCount(event.target.value)}
              disabled={isSaving}
            />
          </div>

          <div className="popup-row">
            <label className="popup-label">Tình trạng</label>

            <input
              className="popup-input"
              style={inputStyle}
              placeholder="Mới, tốt, cũ..."
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
              disabled={isSaving}
            />
          </div>

          <div className="popup-row">
            <label className="popup-label">Ghi chú</label>

            <textarea className="popup-input" style={inputStyle} value={note} onChange={(event) => setNote(event.target.value)} disabled={isSaving} />
          </div>
        </>
      );
    }

    return (
      <>
        <div className="popup-row">
          <label className="popup-label">Giá mua</label>

          <input
            className="popup-input"
            style={inputStyle}
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={purchasePrice}
            onChange={handlePurchasePriceChange}
            disabled={isSaving}
          />
        </div>

        <div className="popup-row">
          <label className="popup-label">Ngày mua</label>

          <input
            className="popup-input"
            style={inputStyle}
            type="date"
            value={purchaseDate}
            onChange={(event) => setPurchaseDate(event.target.value)}
            disabled={isSaving}
          />
        </div>

        <div className="popup-row">
          <label className="popup-label">Lượt dùng dự kiến</label>

          <input
            className="popup-input"
            style={inputStyle}
            type="number"
            min="0"
            value={estimatedUses}
            onChange={(event) => setEstimatedUses(event.target.value)}
            disabled={isSaving}
          />
        </div>

        <div className="popup-row">
          <label className="popup-label">Đã dùng</label>

          <input
            className="popup-input"
            style={inputStyle}
            type="number"
            min="0"
            value={usedCount}
            onChange={(event) => setUsedCount(event.target.value)}
            disabled={isSaving}
          />
        </div>

        <div className="popup-row">
          <label className="popup-label">Bảo hành</label>

          <input
            className="popup-input"
            style={inputStyle}
            type="number"
            min="0"
            placeholder="Số tháng"
            value={warrantyMonths}
            onChange={(event) => setWarrantyMonths(event.target.value)}
            disabled={isSaving}
          />
        </div>

        <div className="popup-row">
          <label className="popup-label">Ghi chú</label>

          <textarea className="popup-input" style={inputStyle} value={note} onChange={(event) => setNote(event.target.value)} disabled={isSaving} />
        </div>
      </>
    );
  };

  return (
    <div
      className="popup-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget && !isSaving) {
          onClose();
        }
      }}
    >
      <div
        className="popup-container"
        style={{
          maxHeight: "85vh",
          overflow: "hidden",
        }}
      >
        <div className="popup-header">
          <h3>{isEditing ? "Chỉnh sửa vật tư" : "Thêm vật tư"}</h3>

          <button type="button" className="popup-close-btn" onClick={onClose} disabled={isSaving}>
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="popup-form inventory-popup-form"
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            minHeight: 0,
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="popup-row">
            <label className="popup-label">Nhóm</label>

            <input
              className="popup-input"
              style={inputStyle}
              placeholder="Ví dụ: Thiết bị"
              value={groupName}
              onChange={(event) => setGroupName(event.target.value)}
              disabled={isSaving}
            />
          </div>

          <div className="popup-row">
            <label className="popup-label">Ngành hàng</label>

            <input
              className="popup-input"
              style={inputStyle}
              placeholder="Ví dụ: Điện thoại"
              value={category}
              onChange={handleCategoryChange}
              disabled={isSaving}
            />
          </div>

          <div className="popup-row">
            <label className="popup-label">Tên</label>

            <input
              className="popup-input"
              style={inputStyle}
              placeholder="Tên sản phẩm / mã sản phẩm"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isSaving}
            />
          </div>

          {renderImageField()}

          {renderDynamicFields()}

          {isEditing && hasBaseData && (
            <div className="popup-row">
              <label className="popup-label">Quyết định mua</label>

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={purchaseDecision === "Mua đúng"}
                    onChange={() => setPurchaseDecision(purchaseDecision === "Mua đúng" ? "" : "Mua đúng")}
                    disabled={isSaving}
                  />{" "}
                  Mua đúng
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={purchaseDecision === "Mua sai"}
                    onChange={() => setPurchaseDecision(purchaseDecision === "Mua sai" ? "" : "Mua sai")}
                    disabled={isSaving}
                  />{" "}
                  Mua sai
                </label>
              </div>
            </div>
          )}

          {hasDynamicFields && (
            <div className="popup-footer">
              <button type="submit" className="popup-submit-btn" disabled={isSaving}>
                {isSaving ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
