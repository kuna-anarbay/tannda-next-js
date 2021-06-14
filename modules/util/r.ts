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
    aboutUs: "Про нас",
    courses: "Курсы",
    login: "Войти",
    loginDescription: "С возвращением в Tañda. Войдите, используя свой телефон и пароль",
    register: "Регистрация",
    registerDescription: "Заполните регистрационные данные. Это займет пару минут. Все, что вам нужно, это номер телефона",
    yourAccountSecure: "Мы серьезно относимся к вопросам конфиденциальности. Вы можете быть уверены, что ваши личные данные надежно защищены.",
    phoneNumber: "Номер телефона",
    phoneNotConfirmed: "Номер еще не подтвержден",
    password: "Пароль",
    loginToYourAccount: "Войдите в свой аккаунт",
    role: "Роль",
    title: "Название",
    description: "Детали",
    type: "Тип",
    resources: "Материалы",
    sendCode: "Отправить код",
    firstName: "Имя",
    lastName: "Фамилия",
    code: "Код",
    forgotPassword: "Забыли пароль?",
    noAccount: "Нет учетной записи?",
    confirm: "Подтверждить",
    resetPassword: "Сбросить пароль",
    chooseImage: "Выбрать изображение",
    delete: "Удалить",
    save: "Сохранить",
    logOut: "Выйти"
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
