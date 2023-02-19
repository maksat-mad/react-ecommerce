import React from 'react';
import drop from '../../../assets/UI/menu.png';
import './DropDown.css';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const DropDown = () => {
    const {t} = useTranslation();
    return (
        <div className={"dropdown"}>
            <div className={"dropdown-btn"}>
                <img src={drop} alt={"drop"} style={{width:"35px", height:"35px"}}/>
            </div>
            <div className={"dropdown-content"}>
                <Link to={"/category"} state={{ category: "fruits" }}>
                    {t('fruits')}
                </Link>
                <Link to={"/category"} state={{ category: "vegetables" }}>
                    {t('vegetables')}
                </Link>
                <Link to={"/category"} state={{ category: "drinks" }}>
                    {t('drinks')}
                </Link>
                <Link to={"/category"} state={{ category: "meats" }}>
                    {t('meats')}
                </Link>
            </div>
        </div>
    );
};

export default DropDown;