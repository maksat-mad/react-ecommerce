import React, {useEffect, useState} from 'react';
import './Main.css';
import main from '../../assets/main.jpg';
import {useFetching} from "../../hook/useFetching";
import CardService from "../../service/main/CardService";
import {useSelector} from 'react-redux';
import Search from "../search/Search";
import MainCarousel from "../../components/main-carousel/MainCarousel";

const Main = () => {
    const [fruitCards, setFruitCards] = useState([]);
    const [vegetableCards, setVegetableCards] = useState([]);
    const [drinkCards, setDrinkCards] = useState([]);
    const [meatCards, setMeatCards] = useState([]);
    const [search, setSearch] = useState(false);

    const navbarInput = useSelector(state => state.navbarInput);
    const selectedCity = useSelector(state => state.city);

    const [fetchFruitCards, isFruitCardsLoading, fruitCardsError] = useFetching(async (limit = 10, page = 1) => {
        const response = await CardService.getItems(limit, page, "1", selectedCity);
        setFruitCards([...response.data.data.content]);
    });

    const [fetchVegetableCards, isVegetableCardsLoading, vegetableCardsError] = useFetching(async (limit = 10, page = 1) => {
        const response = await CardService.getItems(limit, page, "2", selectedCity);
        setVegetableCards([...response.data.data.content]);
    });

    const [fetchDrinkCards, isDrinkCardsLoading, drinkCardsError] = useFetching(async (limit = 10, page = 1) => {
        const response = await CardService.getItems(limit, page, "3", selectedCity);
        setDrinkCards([...response.data.data.content]);
    });

    const [fetchMeatCards, isMeatCardsLoading, meatCardsError] = useFetching(async (limit = 10, page = 1) => {
        const response = await CardService.getItems(limit, page, "4", selectedCity);
        setMeatCards([...response.data.data.content]);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        localStorage.setItem('path', '/');
        fetchFruitCards();
        fetchVegetableCards();
        fetchDrinkCards();
        fetchMeatCards();
    }, []);

    useEffect(() => {
        if (navbarInput !== '') {
            setSearch(true);
        } else {
            setSearch(false);
        }
    }, [navbarInput]);

    return (
        <>
            {search === true ?
                <Search/>
                :
                <>
                    <div className={"container"}>
                        <div className={"main-image"}>
                            <img src={main} alt={"main"}/>
                        </div>
                    </div>
                    <MainCarousel
                        error={fruitCardsError}
                        loading={isFruitCardsLoading}
                        cards={fruitCards}
                        name={"fruits"}
                    />
                    <MainCarousel
                        error={vegetableCardsError}
                        loading={isVegetableCardsLoading}
                        cards={vegetableCards}
                        name={"vegetables"}
                    />
                    <MainCarousel
                        error={drinkCardsError}
                        loading={isDrinkCardsLoading}
                        cards={drinkCards}
                        name={"drinks"}
                    />
                    <MainCarousel
                        error={meatCardsError}
                        loading={isMeatCardsLoading}
                        cards={meatCards}
                        name={"meats"}
                    />
                </>
            }
        </>
    );
};

export default Main;