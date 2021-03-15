const {locales, defaultLocale} = require('./i18n.json');
const nextTranslate = require('next-translate');

const nextConfig = {
    i18n: {
        locales,
        defaultLocale
    },
    images: {
        domains: [
            "https://tannda-storage.s3.eu-central-1.amazonaws.com/tannda"
        ]
    }
}

module.exports = nextTranslate(nextConfig);