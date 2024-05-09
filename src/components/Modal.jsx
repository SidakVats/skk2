import React from "react";
import { ImCross } from "react-icons/im";

const Modal = ({ isOpen, onClose, order }) => {
  const {
    ProductImage,
    OrderItems,
    CustomerName,
    TotalAmount,
    Status,
    OrderID,
  } = order || {};

  const handleClose = (e) => {
    if (isOpen && e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return isOpen && order ? (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal relative">
        <button className="absolute right-5 top-5" onClick={onClose}>
          <ImCross />
        </button>
        <h2 className="text-center text-2xl uppercase">Order Details</h2>
        <div className="order-details grid grid-cols-1 md:grid-cols-2 p-3 gap-5 mt-3">
          <img
            src={ProductImage}
            alt="Product"
            width={300}
            className="rounded-2xl"
          />
          <div className="p-10">
            <p className="text-lg pb-1">
              Item: <span className="text-2xl">{OrderItems}</span>
            </p>
            <p className="text-lg pb-1">
              Customer Name: <span className="text-2xl">{CustomerName}</span>
            </p>
            <p className="text-lg pb-1">
              Total Amount: <span className="text-2xl">{TotalAmount}</span>
            </p>
            <p className="text-lg pb-1">
              Status: <span className="text-2xl capitalize">{Status}</span>
            </p>
            <p className="text-lg pb-1">
              Order ID: <span className="text-2xl">{OrderID}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
