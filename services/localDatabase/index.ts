import {Token} from "../../models/Token";

class LocalDatabase {

    public static instance = new LocalDatabase();

    private constructor() {
    }

    getToken = () => {
        if(typeof window === "undefined") {
            return null;
        }
        const temp = window.localStorage.getItem("accessToken");
        if (temp) {
            return JSON.parse(temp!) as Token
        }

        return null;
    }


}

export default LocalDatabase;