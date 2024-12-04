import React from 'react';
import ReactDOM from 'react-dom';
import "./style.css";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <button className="delete-modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="delete-modal-content">
          <div className="delete-modal-icon">
            <img
              src="https://cdn-icons-png.flaticon.com/512/64/64577.png" // Ícone de lixeira
              alt="Excluir"
              style={{ width: '60px', height: '60px' }}
            />
          </div>
          <h2>Excluir</h2>
          <p>Certeza que deseja excluir?</p>
          <div className="delete-modal-buttons">
            <button className="delete-modal-confirm" onClick={onConfirm}>
              Excluir
            </button>
            <button className="delete-modal-cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root-delete') // Renderiza no nó modal-root
  );
};

export default DeleteModal;
