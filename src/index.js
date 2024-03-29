import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import i18next from "i18next";
import {initReactI18next} from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import Loader from './components/loader/Loader';

i18next
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'kk', 'ru'],
        fallbackLng: ['en', 'kk', 'ru'],
        debug: false,
        detection: {
            order: ['path', 'cookie', 'htmlTag'],
            caches: ['cookie'],
        },
        backend: {
            loadPath: './assets/locales/{{lng}}/translation.json',
        },
    })

ReactDOM.render(
    <Suspense fallback={Loader}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Suspense>,
    document.getElementById('root')
);
