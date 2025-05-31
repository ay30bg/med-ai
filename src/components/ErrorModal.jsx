import React from 'react';
import './ErrorModal.css';

function ErrorModal({ message, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Error</h3>
        <p>{message}</p>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;