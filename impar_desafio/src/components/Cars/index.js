import React, { useState, useEffect } from "react";
import "./style.css";
import Card from "../CardCar";
import NewCarModal from "../NewCar";
import api from "../../services/api";

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [itemsToLoad, setItemsToLoad] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchCards();
    }, [itemsToLoad]);

    useEffect(() => {
        if (searchTerm === "") {
            resetPagination();
        }
    }, [searchTerm]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleLoadMore = () => {
        setItemsToLoad((prevItems) => prevItems + 10);
    };

    const resetPagination = () => {
        setItemsToLoad(10);
        setHasMore(true);
        fetchCards();
    };

    async function fetchCards() {
        try {
            const response = await api.get(`/car?page=1&itens=${itemsToLoad}`);
            if (response.status === 200) {
                const newCards = response.data;

                if (newCards.length < itemsToLoad) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
                setCards(newCards);
            } else {
                console.error("Erro ao buscar os cards da API");
            }
        } catch (error) {
            console.error("Erro ao tentar buscar os cards:", error);
        }
    }

    async function searchCardsByName() {
        if (!searchTerm) {
            resetPagination();
            return;
        }

        try {
            const response = await api.get(`/car/GetByName/${searchTerm}`);
            if (response.status === 200) {
                setCards(response.data);
                setHasMore(false);
            } else {
                console.error("Erro ao buscar os cards pelo nome");
            }
        } catch (error) {
            console.error("Erro ao tentar buscar os cards pelo nome:", error);
        }
    }

    const handleSearch = () => {
        searchCardsByName();
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="busca-button" onClick={handleSearch}>
                    </button>
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
                        idCard={card.id}
                        name={card.name}
                        idPhoto={card.photo.id}
                        photo={card.photo.base64}
                        isModalOpen={isModalOpen}
                        onClose={handleCloseModal}
                        fetchCards={fetchCards}
                    />
                ))}
            </div>
            <div className="pagination">
                {hasMore && cards.length > 0 && (
                    <button onClick={handleLoadMore}>
                        Ver Mais
                    </button>
                )}
            </div>
            <div id="modal-root"></div>
            <div id="modal-root-delete"></div>
            <NewCarModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                fetchCards={fetchCards}
                cardId={0}
                cardName={""}
            />
        </div>
    );
}
