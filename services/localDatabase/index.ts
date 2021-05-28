import Category from "../../modules/category/category.entity";
import User from "../../modules/user/user.entity";

class LocalDatabase {

    public static instance = new LocalDatabase();

    private constructor() {
    }

    // Access token
    getAccessToken(): string | null {
        if (typeof window === 'undefined') {
            return null;
        }
        const accessExp = window.localStorage.getItem("accessExp");
        const accessExpDate = new Date(accessExp).getTime();
        const today = new Date().getTime();
        if(today - accessExpDate > 1000 * 3600 * 24) {
            return null;
        }

        return window.localStorage.getItem("accessToken");
    }

    setAccessToken(token: string) {
        if (typeof window === 'undefined') {
            return;
        }

        window.localStorage.setItem("accessExp", new Date().toString());
        window.localStorage.setItem("accessToken", token);
    }

    // Refresh token
    getRefreshToken(): string | null {
        if (typeof window === 'undefined') {
            return null;
        }

        return window.localStorage.getItem("refreshToken");
    }

    setRefreshToken(token: string) {
        if (typeof window === 'undefined') {
            return;
        }

        window.localStorage.setItem("refreshToken", token);
    }

    // Current user
    getCurrentUser(): User | null {
        if (typeof window === 'undefined') {
            return null;
        }
        const userStr = window.localStorage.getItem("currentUser");
        return JSON.parse(userStr) as User;
    }

    setCurrentUser(user: User) {
        if (typeof window === 'undefined') {
            return;
        }
        const userStr = JSON.stringify(user);
        window.localStorage.setItem("currentUser", userStr);
    }

    // Categories
    getCategories(): Category[] {
        if (typeof window === 'undefined') {
            return [];
        }

        return JSON.parse(window.localStorage.getItem("categories")!) as Category[];
    }

    setCategories(categories: Category[]) {
        if (typeof window === 'undefined') {
            return;
        }

        window.localStorage.setItem("categories", JSON.stringify(categories));
    }

}

export default LocalDatabase;
