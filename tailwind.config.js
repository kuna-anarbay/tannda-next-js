const colors = require("./config/color.theme.js");

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: colors,
        extend: {
            borderWidth: {
              '0.5': '0.5px'
            },
            borderRadius: {
                "1": "0.25rem",
                "1.5": "0.375rem",
                "2.5": "0.625rem",
                "4": "1rem"
            },
            lineHeight: {
                'h1': '4.475rem'
            },
            height: {
                "0.25": "0.0625rem",
                "18": "4.5rem",
                "30": "7.5rem",
                "screen": "100vh",
                "80vh": "80vh",
                "120": "30rem",
                "drawer-content": "calc(100vh - 11.75rem)"
            },
            width: {
                "30": "7.5rem",
                "75": "18.75rem",
                "350/1200": "30%",
                "32%":"32%",
                "642/1200": "53.5%",
                "460/1200": "38.333333%",
                "444/1000": "44.4%",
                "480/1000": "48%",
                "120": "30rem",
                "screen": "100vw"
            },
            maxWidth: {
                "300": "75rem",
                "250": "62.5rem",
                "135": "33.75rem"
            },
            padding: {
                "0.75": "",
                "7": "1.75rem",
                "9": "2.25rem",
                "30": "7.5rem"
            },
            margin: {
                "30": "7.5rem"
            },
            fontSize: {
                caption2: "0.625rem",
                caption1: "0.75rem",
                footnote: "0.875rem",
                subheadline: "0.9375rem",
                base: "1rem",
                title4: "1.375rem",
                title3: "1.25rem",
                title2: "1.5rem",
                title1: "1.75rem",
                largeTitle: "2.25rem",
                largeTitle2: "2.5rem",
                header: "3rem",
                header2: "3.75rem"
            },
            inset: {
                "75": "18.75rem",
            },
            fontVariantNumeric: {
                "small-caps": "small-caps"
            },
            inset: {
                "13.52": "13.52%",
                "12.78": "12.78%"
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
