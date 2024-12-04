import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import CreateIcon from '../../assets/images/icone_criar.png';
import api from "../../services/api";

export default function NewCarModal({ isOpen, onClose, fetchCards, cardId, cardName, photo, idPhoto }) {
    const [name, setName] = useState('');
    const [fileName, setFileName] = useState("Nenhum arquivo selecionado");
    const [fileBase64, setFileBase64] = useState("");

    useEffect(() => {
        if (isOpen && cardId) {
            setName(cardName || ''); 
        }
    }, [isOpen, cardId, cardName]);

    if (!isOpen) return null;

    async function handleSubmit() {
        try {
            if (cardId) {
                debugger
                const data = {
                    id: cardId,
                    name: name,
                    status: true,
                    photo: {
                        id: idPhoto,
                        base64: fileBase64,
                    },
                };

                if (data.photo.base64 == '')
                    data.photo.base64 = photo;

                const response = await api.put(`/car`, data);
                if (response.status === 200) {
                    alert("Card atualizado!");
                }
            } else {

                const data = {
                    name: name,
                    status: true,
                    photo: {
                        base64: fileBase64,
                    },
                };

                const response = await api.post('/car', data);
                if (response.status === 200) {
                    alert("Card criado!");
                }
            }

            fetchCards();
            onClose();
            setName('');
            setFileName("Nenhum arquivo selecionado");
            setFileBase64('');
        } catch (error) {
            alert("Erro ao tentar salvar o card");
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.type !== "image/jpeg") {
                alert("Apenas arquivos JPG são permitidos.");
                return;
            }

            setFileName(file.name);

            const reader = new FileReader();
            reader.onloadend = () => {
                setFileBase64(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFileName("Nenhum arquivo selecionado");
            setFileBase64("");
        }
    };

    return ReactDOM.createPortal(
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img className="modal-icon" src={CreateIcon} alt="Ícone criar" />
                <span className="modal-create-card-titulo">
                    {cardId != 0 ? "Editar Card" : "Criar Card"}
                </span>
                <div className="modal-separator"></div>
                <div className="modal-nome-container">
                    <span className="modal-titulo">DIGITE UM NOME PARA O CARD</span>
                    <div className="modal-input-container">
                        <input
                            type="text"
                            placeholder="Digite o título"
                            className="modal-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                </div>
                <div className="modal-nome-container">
                    <span className="modal-titulo">INCLUA UMA IMAGEM PARA APARECER NO CARD</span>
                    <div className="modal-input-container">
                        <input
                            type="text"
                            className="modal-input"
                            placeholder={fileName}
                            readOnly
                        />
                        <label htmlFor="file-upload" className="file-upload-button">
                            Escolher arquivo
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            className="file-input"
                            accept="image/jpeg"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <div className="modal-separator-final"></div>
                <button className="cria-card-button" onClick={handleSubmit}>
                    <span className="novo-label">{cardId ? "Salvar Alterações" : "Criar Card"}</span>
                </button>
            </div>
        </div>,
        document.getElementById("modal-root") 
    );
}
