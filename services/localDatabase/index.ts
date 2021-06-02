import User from "../../modules/user/user.entity";
import {LoginRes} from "../../modules/auth/dto/login.dto";

class LocalDatabase {

    public static instance = new LocalDatabase();

    private constructor() {
    }


    //Configure
    configure(value: LoginRes | null) {
        if (value) {
            if (value.refreshToken) {
                this.setString("refreshToken", value.refreshToken);
            }
            this.setString("accessToken", value.accessToken);
            this.set("currentUser", value.user);
        } else {
            this.delete("refreshToken");
            this.delete("accessToken");
            this.delete("currentUser");
        }
    }

    getUser(): LoginRes | null {
        const accessToken = this.string("accessToken");
        const refreshToken = this.string("refreshToken");
        const user = this.object<User>("currentUser");
        if (accessToken && refreshToken && user) {
            return {accessToken, refreshToken, user};
        }

        return null;
    }

    object = <T = string>(key: string): T | null => {
        if (typeof window === 'undefined') {
            return null;
        }
        const item = window.localStorage.getItem(key);
        if (!item) {
            return null;
        }

        const cast = <T>JSON.parse(item);
        if (!cast) {
            return null;
        }

        return cast;
    }

    string = (key: string): string | null => {
        if (typeof window === 'undefined') {
            return null;
        }

        return window.localStorage.getItem(key);
    }

    set = <T>(key: string, value: T) => {
        if (typeof window === 'undefined') {
            return;
        }

        window.localStorage.setItem(key, JSON.stringify(value));
    }

    setString = (key: string, value: string) => {
        if (typeof window === 'undefined') {
            return;
        }

        window.localStorage.setItem(key, value);
    }

    delete = (key: string) => {
        if (typeof window === 'undefined') {
            return;
        }

        window.localStorage.removeItem(key);
    }

}

export default LocalDatabase;
