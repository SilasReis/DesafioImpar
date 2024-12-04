import React, { useState, useEffect } from "react";
import "./style.css";
import Card from "../CardCar";
import NewCarModal from "../NewCar";
import api from "../../services/api";

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [itemsToLoad, setItemsToLoad] = useState(10); // Começa com 10 itens
    const [searchTerm, setSearchTerm] = useState("");
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchCards(); // Carrega os itens inicialmente
    }, [itemsToLoad]);

    useEffect(() => {
        if (searchTerm === "") {
            resetPagination(); // Reseta a paginação quando o campo de busca está vazio
        }
    }, [searchTerm]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleLoadMore = () => {
        setItemsToLoad((prevItems) => prevItems + 10); // Incrementa os itens a carregar
    };

    const resetPagination = () => {
        setItemsToLoad(10); // Reseta para 10 itens iniciais
        setHasMore(true); // Reativa o botão "Ver Mais"
        fetchCards();
    };

    // Função para buscar os cards da API
    async function fetchCards() {
        try {
            const response = await api.get(`/car?page=1&itens=${itemsToLoad}`); // Sempre começa da página 1
            if (response.status === 200) {
                const newCards = response.data;

                // Se o número de itens retornados for menor que o esperado, desativa o botão "Ver Mais"
                if (newCards.length < itemsToLoad) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }

                // Atualiza os cards com os dados da API
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
                setHasMore(false); // Busca por nome não deve ter paginação
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
                {/* {!hasMore && <p>Não há mais itens para carregar.</p>} */}
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
