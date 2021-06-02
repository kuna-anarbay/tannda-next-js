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
    }
};

const string = {
    aboutUs: "common:aboutUs",
    courses: "common:courses",
    login: "common:login",
    register: "common:register",
    phoneNumber: "auth:phoneNumber",
    password: "auth:password",
    loginToYourAccount: "auth:loginToYourAccount"
};

const data = {
    navbarItems: [
        {
            path: "/about",
            title: string.aboutUs,
        }
    ],
    loginItems: [
        {
            path: "/courses",
            title: string.courses
        }
    ],
    languages: [
        "english",
        "russian",
        "qazaq"
    ]
}


export default {
    image, data, string
}
