import React, { useState } from "react";
import "./style.css";
import CreateIcon from '../../assets/images/icone_criar.png';
import api from "../../services/api";

export default function NewCarModal({ isOpen, onClose, fetchCards }) {
    const [name, setName] = useState('');
    const [fileName, setFileName] = useState("Nenhum arquivo selecionado");
    const [fileBase64, setFileBase64] = useState("");

    if (!isOpen) return null;

    async function CreateCard() {
        const data = {
            "name": name,
            "status": true,
            "photo": {
                "base64": fileBase64
            }
        }

        try {

            const response = await api.post('/car', data);

            if (response.status) {
                alert("Card criado!");
                fetchCards();
                onClose();
                setName('');
                setFileName("Nenhum arquivo selecionado");
                setFileBase64('');
            }

        } catch (error) {
            alert("Erro ao tentar criar um novo card");
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
                console.log("Base64 do arquivo:", reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFileName("Nenhum arquivo selecionado");
            setFileBase64("");
        }
    };

    return (
        <div className="modal" onClick={onClose} >
            <div className="modal-content" onClick={(e) => e.stopPropagation()} >
                <img className="modal-icon" src={CreateIcon}></img>
                <span className="modal-create-card-titulo"> Criar Card</span>
                <div className="modal-separator"></div>
                <div className="modal-nome-container">
                    <span className="modal-titulo">DIGITE UM NOME PARA O CARD</span>
                    <div className="modal-input-container">
                        <input
                            type="text"
                            placeholder="Digite o título"
                            className="modal-input"
                            onChange={e => setName(e.target.value)}
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
                            className="file-input" accept="image/jpeg"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <div className="modal-separator-final"></div>
                <button className="cria-card-button" onClick={CreateCard}>
                    <span className="novo-label">Cria Card</span>
                </button>
            </div>
        </div>
    );
}
