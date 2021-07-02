const colors    = require("./config/color.theme"),
      fontSizes = require("./config/font-size.theme");

module.exports = {
    purge: false,
    darkMode: false,
    theme: {
        colors: colors,
        fontSize: fontSizes,
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
