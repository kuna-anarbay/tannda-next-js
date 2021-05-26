import Category from "../../modules/category/category.entity";

class LocalDatabase {

    public static instance = new LocalDatabase();

    private constructor() {
    }


    getToken(): string | undefined {
        return undefined;
    }

    getCategories(): Category[] {
        if (typeof window === undefined) {
            return [];
        }

        return JSON.parse(window.localStorage.getItem("categories")!) as Category[];
    }

    setCategories(categories: Category[]) {
        if (typeof window === undefined) {
            return [];
        }

        window.localStorage.setItem("categories", JSON.stringify(categories));
    }

}

export default LocalDatabase;
