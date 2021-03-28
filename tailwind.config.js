module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                main: "#00457C",
                divider: "#F3F3F6",
                secondaryLabel: "#8A8A8E",
                secondaryBackground: "#F8F8F8",
                secondaryBlack: "#252525",
                primary: {
                    50: "#D9DCDF",
                    100: "#CFD6DB",
                    200: "#B7C5D0",
                    300: "#A1B6C6",
                    400: "#89A5BB",
                    500: "#7294B0",
                    600: "#5C85A6",
                    700: "#45759C",
                    800: "#2E6591",
                    900: "#175587"
                }
            },
            padding: {
                "8": "8px",
                "12": "12px",
                "16": "16px",
                "20": "20px",
                "24": "24px",
                "36": "36px",
                "40": "40px",
                "64": "64px",
                "120": "120px"
            },
            margin: {
                "8": "8px",
                "12": "12px",
                "16": "16px",
                "20": "20px",
                "24": "24px",
                "36": "36px",
                "40": "40px",
                "120": "120px"
            },
            fontSize: {
                "largeTitle": "34px",
                "title1": "28px",
                "title2": "22px",
                "title3": "20px",
                "body": "17px",
                "callout": "16px",
                "subHeadline": "15px",
                "footnote": "13px",
                "caption1": "12px",
                "caption2": "11px",
                "caption3": "10px"
            },
            height: {
                "fill": "calc(100vh - 64px)",
                "36": "36px",
                "44": "44px",
                "48": "48px"
            },
            size: {
                512: "512px"
            },
            width: {
                512: "512px",
                720: "720px"
            },
            borderRadius: {
                "8": "8px",
                "12": "12px",
                "16": "16px",
                "20": "20px",
                "24": "24px",
                "36": "36px",
                "40": "40px"
            },
            space: {
                "8": "8px",
                "12": "12px",
                "16": "16px",
                "20": "20px",
                "24": "24px",
                "36": "36px",
                "40": "40px"
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
