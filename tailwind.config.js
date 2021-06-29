const colors = require("./config/color.theme.js");

module.exports = {
    purge: false,
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: colors,
        extend: {
            borderRadius: {
                "1": "0.25rem",
                "1.5": "0.375rem",
                "2.5": "0.625rem",
                "4": "1rem",
            },
            height: {
                "0.25": "0.0625rem",
                "30": "7.5rem",
                "screen": "100vh",
                "80vh": "80vh",
                "drawer-content": "calc(100vh - 11.75rem)",
                "modal-content": "calc(100vh - 13.75rem)"
            },
            width: {
                "30": "7.5rem",
                "75": "18.75rem",
                "screen": "100vw"
            },
            padding: {
                "0.75": ""
            },
            fontSize: {
                caption2: "0.625rem",
                caption1: "0.75rem",
                footnote: "0.875rem",
                subheadline: "0.9375rem",
                base: "1rem",
                title3: "1.25rem",
                title2: "1.5rem",
                title1: "1.75rem",
                largeTitle: "2.25rem",
                header: "3rem"
            },
            inset: {
                "75": "18.75rem",
            },
            fontVariantNumeric: {
                "small-caps": "small-caps"
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
