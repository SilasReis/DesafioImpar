import React, { useState, useEffect } from "react";
import "./style.css";
import Card from "../CardCar";
import NewCarModal from "../NewCar";
import api from "../../services/api";

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cards, setCards] = useState([]); // Estado para armazenar os cards
    const [page, setPage] = useState(1); // Estado para a página atual
    const [itemsPerPage] = useState(10); // Itens por página

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Função para buscar os cards da API com paginação
    async function fetchCards() {
        try {
            const response = await api.get(`/car?page=${page}&itens=${itemsPerPage}`);
            if (response.status === 200) {
                setCards(response.data); // Atualiza os cards com os dados da API
            } else {
                console.error("Erro ao buscar os cards da API");
            }
        } catch (error) {
            console.error("Erro ao tentar buscar os cards:", error);
        }
    }

    // useEffect para carregar os cards ao montar o componente
    useEffect(() => {
        fetchCards();
    }, [page]); // Refaz a chamada quando a página muda

    // Função para mudar de página
    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="logo-teste"></div>
            </div>
            <div className="busca-fundo">
                <div className="busca-container">
                    <input
                        type="text"
                        placeholder="Digite aqui sua busca..."
                        className="busca-input"
                    />
                    <button className="busca-button"></button>
                </div>
            </div>
            <div className="resultado-busca">Resultado de busca</div>
            <div className="novo-container">
                <button className="novo-button" onClick={handleOpenModal}>
                    <span className="novo-label">Novo Card</span>
                </button>
            </div>
            <div className="card-container">
                {cards.map((card, index) => (
                    <Card 
                        key={index} 
                        name={card.name} 
                        photo={card.photo.base64} 
                        isModalOpen={isModalOpen}
                        onClose={handleCloseModal}
                        fetchCards={fetchCards}
                    />
                ))}
            </div>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={page === 1}>
                    Anterior
                </button>
                <span>Página {page}</span>
                <button onClick={handleNextPage}>
                    Próxima
                </button>
            </div>
            <NewCarModal isOpen={isModalOpen} onClose={handleCloseModal} fetchCards={fetchCards} />
        </div>
    );
}
