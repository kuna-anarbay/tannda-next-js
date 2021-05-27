const {locales, defaultLocale} = require('./i18n.json');
const nextTranslate = require('next-translate');

const nextConfig = {
    i18n: {
        locales,
        defaultLocale
    }
}

module.exports = nextTranslate(nextConfig);
