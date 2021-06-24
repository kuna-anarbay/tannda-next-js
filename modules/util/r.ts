import {strings} from "./strings";

const image = {
    logoSquare: {
        val: "/images/logo-square.svg",
        alt: "Tañda logo"
    },
    logoIconText: {
        val: "/images/logo-icon-text.svg",
        alt: "Tañda logo"
    },
    logoTextWhite: {
        val: "/images/logo-text-white.svg",
        alt: "Tañda logo"
    },
    file: {
        image: "/icons/file-image.svg",
        doc: "/icons/file-doc.svg",
        pdf: "/icons/file-pdf.svg",
        sheets: "/icons/file-sheets.svg",
        presentation: "/icons/file-presentation.svg",
    }
};


const data = {
    navbarItems: [
        {
            path: "/about",
            title: strings.aboutUs,
        }
    ],
    loginItems: [
        {
            path: "/courses/my",
            title: strings.courses
        }
    ],
    languages: [
        "english",
        "russian",
        "qazaq"
    ]
}


export default {
    image, data
}
