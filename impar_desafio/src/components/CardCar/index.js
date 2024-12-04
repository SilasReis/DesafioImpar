import React, { useState } from "react";
import './style.css';
import TrashIcon from '../../assets/images/Icon-trash.png';
import EditIcon from '../../assets/images/Icon-edit.png';
import NewCarModal from "../NewCar";

export default function Card({ id, name, photo, fetchCards }) {

    const [isModalOpen, setIsModalOpen] = useState(false); // Gerenciar o estado do modal

    const handleOpenModal = () => {
        setIsModalOpen(true); // Abre o modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Fecha o modal
    };

    return (
        <>
            <div className="card">
                <div className="card-icon">
                    <img src={photo} alt={`Ícone do ${name}`} />
                </div>
                <div className="card-text">
                    {name}
                </div>
                <div className="card-actions">
                    <button className="card-action-delete" onClick={() => console.log(`Excluir card com ID: ${id}`)}>
                        <img src={TrashIcon} alt="Excluir" />
                        Excluir
                    </button>
                    <button className="card-action-edit" onClick={handleOpenModal}>
                        <img src={EditIcon} alt="Editar" />
                        Editar
                    </button>
                </div>
            </div>
            <NewCarModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                fetchCards={fetchCards}
            />
        </>

    );
}
