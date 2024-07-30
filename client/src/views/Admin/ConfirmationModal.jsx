import React from "react";

function ConfirmationModal({ show, onClose, onConfirm }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirmation</h2>
        <p>Are you sure you want to delete this category?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
}

export default ConfirmationModal;