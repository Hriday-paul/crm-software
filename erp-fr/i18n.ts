import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next'
import backend from 'i18next-http-backend'
i18n
    .use(LanguageDetector)
    .use(backend)
    .use(initReactI18next).init({
        supportedLngs: ['en', 'bn'],
        debug: true,
        fallbackLng: "en",
        returnObjects: true,
        lng: localStorage.getItem('i18nextLng') || 'en',
        interpolation: {
            escapeValue: false, // React already safes from XSS
        },
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
            caches: ['localStorage'],
        },
    })
