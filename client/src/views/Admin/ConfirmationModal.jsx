import React from "react";

function ConfirmationModal({ show, onClose, onConfirm, message }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirmation</h2>
        <p><strong>{message}</strong></p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
}

export default ConfirmationModal;