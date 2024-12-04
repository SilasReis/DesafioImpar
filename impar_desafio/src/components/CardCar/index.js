import React, { useState } from "react";
import './style.css';
import TrashIcon from '../../assets/images/Icon-trash.png';
import EditIcon from '../../assets/images/Icon-edit.png';
import NewCarModal from "../NewCar";
import DeleteCarModal from "../DeleteCar";

export default function Card({ idCard, name, photo, idPhoto, fetchCards }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true); // Abre o modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Fecha o modal
    };

    const handleOpenModalDelete = () => {
        setIsModalOpenDelete(true); // Abre o modal
    };

    const handleCloseModalDelete = () => {
        setIsModalOpenDelete(false); // Fecha o modal
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
                    <button className="card-action-delete" onClick={handleOpenModalDelete}>
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
                cardId={idCard}
                cardName={name}
                idPhoto={idPhoto}
                photo={photo}
            />
            <DeleteCarModal
                isOpen={isModalOpenDelete}
                onClose={handleCloseModalDelete}
            />

        </>

    );
}
