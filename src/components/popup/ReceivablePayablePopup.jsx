import React, { useEffect, useState } from "react";

import "../../css/Popup.css";

const getToday = () => {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  return `${day}/${month}/${year}`;
};

const parseMoney = (value = "") => {
  const text = String(value).trim();

  const currencyMatch = text.match(
    /[^\d\s.,+\-*/()]+$/
  );

  const currency =
    currencyMatch?.[0] || "VNĐ";

  const expression = text
    .replace(/[^\d.,+\-*/()]/g, "")
    .replace(/\./g, "");

  if (!expression) {
    return {
      amount: 0,
      currency,
    };
  }

  try {
    const result = Function(
      `"use strict"; return (${expression.replace(
        /,/g,
        "."
      )})`
    )();

    return {
      amount: Number.isFinite(Number(result))
        ? Number(result)
        : 0,
      currency,
    };
  } catch {
    const number = Number(
      expression.replace(",", ".")
    );

    return {
      amount: Number.isFinite(number)
        ? number
        : 0,
      currency,
    };
  }
};

const formatMoneyInput = (value = "") => {
  const text = String(value);

  const currencyMatch = text.match(
    /[^\d.,+\-*/()]+$/
  );

  const currency =
    currencyMatch?.[0] || "";

  const numberPart = text.replace(
    /[^\d.,+\-*/()]/g,
    ""
  );

  if (!numberPart) {
    return currency;
  }

  const clean = numberPart.replace(
    /[^\d]/g,
    ""
  );

  if (!clean) {
    return currency;
  }

  return `${Number(clean).toLocaleString(
    "vi-VN"
  )}${currency}`;
};

export default function ReceivablePayablePopup({
  isOpen,
  onClose,
  currentDate,
  onSave,
  lastSavedData,
}) {
  const [type, setType] =
    useState("receivable");

  const [counterparty, setCounterparty] =
    useState("");

  const [content, setContent] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [paid, setPaid] =
    useState("");

  const [remaining, setRemaining] =
    useState("0 VNĐ");

  const [date, setDate] =
    useState(currentDate || getToday());

  const [note, setNote] =
    useState("");

  const isEditing =
    Boolean(lastSavedData);

  useEffect(() => {
    if (!isOpen) return;

    if (lastSavedData) {
      setType(
        lastSavedData.type ||
          "receivable"
      );

      setCounterparty(
        lastSavedData.counterparty ||
          ""
      );

      setContent(
        lastSavedData.content || ""
      );

      setAmount(
        lastSavedData.amountText ||
          lastSavedData.amount ||
          ""
      );

      setPaid(
        lastSavedData.paidText ||
          lastSavedData.paid ||
          ""
      );

      setRemaining(
        lastSavedData.remainingText ||
          lastSavedData.remaining ||
          "0 VNĐ"
      );

      setDate(
        lastSavedData.date ||
          currentDate ||
          getToday()
      );

      setNote(
        lastSavedData.note || ""
      );

      return;
    }

    setType("receivable");
    setCounterparty("");
    setContent("");
    setAmount("");
    setPaid("");
    setRemaining("0 VNĐ");
    setDate(
      currentDate || getToday()
    );
    setNote("");
  }, [
    isOpen,
    currentDate,
    lastSavedData,
  ]);

  useEffect(() => {
    const amountData =
      parseMoney(amount);

    const paidData =
      parseMoney(paid);

    const currency =
      amountData.currency ||
      paidData.currency ||
      "VNĐ";

    const value = Math.max(
      0,
      amountData.amount -
        paidData.amount
    );

    setRemaining(
      `${value.toLocaleString(
        "vi-VN"
      )}${currency}`
    );
  }, [amount, paid]);

  if (!isOpen) return null;

  const handleAmountChange = (e) => {
    setAmount(
      formatMoneyInput(
        e.target.value
      )
    );
  };

  const handlePaidChange = (e) => {
    setPaid(
      formatMoneyInput(
        e.target.value
      )
    );
  };

  const handleSave = () => {
    const amountData =
      parseMoney(amount);

    const paidData =
      parseMoney(paid);

    const currency =
      amountData.currency ||
      paidData.currency ||
      "VNĐ";

    const remainingValue = Math.max(
      0,
      amountData.amount -
        paidData.amount
    );

    const newData = {
      ...(lastSavedData || {}),

      type,

      counterparty:
        counterparty.trim(),

      content:
        content.trim(),

      amount:
        amountData.amount,

      paid:
        paidData.amount,

      remaining:
        remainingValue,

      currency,

      amountText:
        `${amountData.amount.toLocaleString(
          "vi-VN"
        )}${currency}`,

      paidText:
        `${paidData.amount.toLocaleString(
          "vi-VN"
        )}${currency}`,

      remainingText:
        `${remainingValue.toLocaleString(
          "vi-VN"
        )}${currency}`,

      date,

      note:
        note.trim(),
    };

    onSave(newData);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h3>
            Cập nhật công nợ ({date})
          </h3>

          <button
            className="close-btn"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <div className="popup-tabs">
          <button
            className={`tab-btn ${
              type === "receivable"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setType("receivable")
            }
            type="button"
          >
            Tiền phải thu
          </button>

          <button
            className={`tab-btn ${
              type === "payable"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setType("payable")
            }
            type="button"
          >
            Tiền phải trả
          </button>
        </div>

        <div className="popup-body">
          <div className="form-group">
            <label>
              {type === "receivable"
                ? "Đối tác"
                : "NCC"}
            </label>

            <input
              type="text"
              value={counterparty}
              onChange={(e) =>
                setCounterparty(
                  e.target.value
                )
              }
              placeholder={
                isEditing
                  ? type ===
                    "receivable"
                    ? "Nhập đối tác..."
                    : "Nhập NCC..."
                  : ""
              }
            />
          </div>

          <div className="form-group">
            <label>
              Nội dung
            </label>

            <input
              type="text"
              value={content}
              onChange={(e) =>
                setContent(
                  e.target.value
                )
              }
              placeholder={
                isEditing
                  ? "Nhập nội dung..."
                  : ""
              }
            />
          </div>

          <div className="form-group">
            <label>
              Số tiền
            </label>

            <input
              type="text"
              inputMode="text"
              value={amount}
              onChange={
                handleAmountChange
              }
              placeholder={
                isEditing
                  ? "Nhập số tiền..."
                  : ""
              }
            />
          </div>

          <div className="form-group">
            <label>
              Đã thanh toán
            </label>

            <input
              type="text"
              inputMode="text"
              value={paid}
              onChange={
                handlePaidChange
              }
              placeholder={
                isEditing
                  ? "Nhập số tiền đã thanh toán..."
                  : ""
              }
            />
          </div>

          <div className="form-group">
            <label>
              Còn lại
            </label>

            <input
              type="text"
              value={remaining}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>
              Ngày
            </label>

            <input
              type="text"
              value={date}
              onChange={(e) =>
                setDate(
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>
              Ghi chú
            </label>

            <textarea
              value={note}
              onChange={(e) =>
                setNote(
                  e.target.value
                )
              }
              placeholder={
                isEditing
                  ? "Nhập ghi chú..."
                  : ""
              }
            />
          </div>
        </div>

        <div className="popup-footer">
          <button
            className="submit-update-btn"
            onClick={handleSave}
            type="button"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}