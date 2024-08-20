import React from "react";

function Toast({ type, message, onClose }) {
  const toastType = {
    success: "bg-success text-white",
    error: "bg-danger text-white",
    info: "bg-info text-white",
    warning: "bg-warning text-dark",
  };

  return (
    <div
      className={`toast align-items-center ${toastType[type]}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default Toast;
