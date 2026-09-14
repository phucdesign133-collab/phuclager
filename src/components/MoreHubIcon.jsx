// src\components\MoreHubIcon.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { moreHubData } from "../datas/moreHubData";
import { supabase } from "./utils/supabaseClient";
import { getGroups } from "../datas/inventoryLogic";
import InventoryPopup from "./popup/InventoryPopup";
import "../css/MoreHubIcon.css";

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

export default function MoreHubIcon() {
  const navigate = useNavigate();

  const [inventoryItems, setInventoryItems] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const loadInventoryItems = async () => {
    const { data, error } = await supabase.from("inventory_items").select("*");

    if (error) {
      console.error("LỖI LOAD VẬT TƯ:", error);
      setInventoryItems([]);
      return;
    }

    setInventoryItems(data || []);
  };

  useEffect(() => {
    loadInventoryItems();

    const handleDataChanged = () => {
      loadInventoryItems();
    };

    window.addEventListener("supabase-data-changed", handleDataChanged);

    return () => {
      window.removeEventListener("supabase-data-changed", handleDataChanged);
    };
  }, []);

  const handleItemClick = (item) => {
    if (item.action === "add") {
      setEditingData(null);
      setIsPopupOpen(true);
      return;
    }

    if (item.action === "group") {
      const slug = createSlug(item.group);
      navigate(`/more/${slug}`);
      return;
    }

    if (item.path) {
      navigate(item.path);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setEditingData(null);
  };

  const handleSavePopup = async (formData) => {
    console.log("📦 INVENTORY POPUP:", formData);

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

      if (formData.id) {
        const { error } = await supabase.from("inventory_items").update(payload).eq("id", formData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("inventory_items").insert(payload);

        if (error) throw error;
      }

      await loadInventoryItems();

      window.dispatchEvent(new CustomEvent("supabase-data-changed"));

      return {
        success: true,
      };
    } catch (error) {
      console.error("❌ LỖI LƯU VẬT TƯ:", error);

      return {
        success: false,
        error,
      };
    }
  };

  const inventoryGroups = getGroups(inventoryItems);

  return (
    <>
      <div className="more-hub-container">
        {moreHubData.map((section) => {
          const isSupplies = section.id === "supplies";

          let sectionItems = section.items || [];

          if (isSupplies) {
            if (inventoryItems.length === 0) {
              sectionItems = [
                {
                  id: "add-inventory",
                  name: "Thêm vật tư",
                  icon: "+",
                  action: "add",
                },
              ];
            } else {
              sectionItems = inventoryGroups.map((group) => ({
                id: `inventory-group-${group}`,
                name: group,
                icon: "📦",
                action: "group",
                group,
              }));
            }
          }

          return (
            <div key={section.id} className="more-hub-section">
              <h2 className="more-section-title">{section.sectionName}</h2>

              <div className="more-hub-grid-4cols">
                {sectionItems.map((item) => (
                  <div key={item.id} className="more-hub-icon-card" onClick={() => handleItemClick(item)}>
                    <div className="more-icon-wrapper">
                      <span className="more-icon-symbol">{item.icon}</span>
                    </div>

                    <span className="more-icon-name">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {isPopupOpen && <InventoryPopup onClose={handleClosePopup} onSave={handleSavePopup} initialData={editingData} />}
    </>
  );
}
