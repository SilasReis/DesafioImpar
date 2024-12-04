import React from 'react';
import ReactDOM from 'react-dom';
import "./style.css";
import TrashIconCircle from '../../assets/images/Icon-trash-circle.png';
import api from "../../services/api";

const DeleteModal = ({ isOpen, onClose, cardId, fetchCards }) => {
    if (!isOpen) return null;

    async function handleDelete() {
        try {
            debugger
            const response = await api.delete(`/car`, {
                params: {
                    id: cardId,
                },
            });
            if (response.status === 200) {
                alert("Card excluído!");
            } else {
                alert("Erro ao tentar excluir o card.");
            }
            fetchCards();
            onClose();
        } catch (error) {
            alert("Erro ao tentar excluir o card");
        }
    }

    return ReactDOM.createPortal(
        <div className="delete-modal-overlay">
            <div className="delete-modal">
                <button className="delete-modal-close" onClick={onClose}>
                    X
                </button>
                <div className="delete-modal-content">
                    <div className="delete-circle">
                        <img src={TrashIconCircle} alt="Excluir" />
                    </div>
                    <div className='delete-text-container'>
                        <span className="delete-text">Excluir</span>
                    </div>
                    <p className='delete-text-confirm'>Certeza que deseja excluir?</p>
                    <div className="modal-separator"></div>
                    <div className="delete-modal-buttons">
                        <button className="delete-modal-confirm" onClick={handleDelete}>
                            Excluir
                        </button>
                        <button className="delete-modal-cancel" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root-delete')
    );
};

export default DeleteModal;
