export interface Translatable {
    id: number | null;
    kz: string | null;
    en: string | null;
    ru: string | null;
}

export const translate = (value: Translatable, lang: string) => {
    switch (lang) {
        case "en":
            return value.en;
        case "kz":
            return value.kz;
        case "ru":
            return value.ru;
        default:
            return null;
    }
}