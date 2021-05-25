module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#054EA1",
                    selected: "#04448C",
                    "extra-light": "#F0F6FE",
                    light: "#BADDFF"
                },
                divider: {
                    DEFAULT: "#E1E4E8",
                    light: "#F3F3F6"
                },
                background: "#FFFFFF",
                muted: "#F8F8F8",
                disabled: "#9DA1B0",
                label: {
                    DEFAULT: "#111111",
                    light: "#586069",
                    "extra-light": "#848488",
                    darker: "#252525"
                },
                danger: "#CC0000",
                warning: "#FFA718",
                highlight: {
                    DEFAULT: "#F4D150",
                    light: ""
                },
                sidebar: {
                    DEFAULT: "#1E2739",
                    light: "#263145"
                }
            },
            borderRadius: {
                "1": "0.25rem",
                "4": "1rem"
            },
            height: {
                "0.25": "0.0625rem",
                "30": "7.5rem",
                "screen": "100vh"
            },
            width: {
                "30": "7.5rem",
                "75": "18.75rem",
                "screen": "100vw"
            },
            fontSize: {
                caption2: "0.625rem",
                caption1: "0.75rem",
                footnote: "0.875rem",
                base: "1rem",
                title3: "1.25rem",
                title2: "1.5rem",
                title1: "1.75rem",
                largeTitle: "2.25rem"
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
