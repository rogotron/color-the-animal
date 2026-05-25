import React from 'react'

export default function ConfirmModal({ title, message, confirmLabel = 'Yes', cancelLabel = 'No', onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal modal-small" onClick={(e) => e.stopPropagation()}>
        <h2 className="confirm-title">{title}</h2>
        {message && <p className="confirm-message">{message}</p>}
        <div className="confirm-actions">
          <button type="button" className="btn btn-cancel" onClick={onCancel}>{cancelLabel}</button>
          <button type="button" className="btn btn-confirm" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}
