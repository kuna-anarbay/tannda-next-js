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

    setToken = (token: Object | null) => {
        // if (token) {
        //     localStorage.setItem("accessToken", JSON.stringify(token));
        // } else {
        //     localStorage.removeItem("accessToken");
        // }
    }

    getCities = () => {
        // const temp = localStorage.getItem("cities");
        // if (temp) {
        //     return JSON.parse(temp!)
        // }

        return [];
    }

    setCities = (cities: Array<Object>) => {
        if(typeof window === "undefined") {
            return null;
        }
        window.localStorage.setItem("cities", JSON.stringify(cities));
    }

    getProfile = () => {
        // const temp = localStorage.getItem("profile");
        // if (temp) {
        //     return JSON.parse(temp!)
        // }

        return null;
    }

    setProfile = (profile: Object) => {
        // localStorage.setItem("profile", JSON.stringify(profile));
    }

    getAuthorization = () => {
        // const temp = localStorage.getItem("authorization");
        // if (temp) {
        //     return JSON.parse(temp!)
        // }

        return null;
    }

    updateAuthorization = (headers: any) => {
        // if (!headers) {
        //     return;
        // }
        // let authorization = this.getAuthorization();
        // if (authorization === null) {
        //     authorization = {
        //         role: headers.role,
        //         needsToVerifyEmail: headers.needsToVerifyEmail === "true",
        //         needsToChangePassword: headers.needsToChangePassword === "true",
        //         needsToSetupProfile: headers.needsToSetupProfile === "true"
        //     }
        //     localStorage.setItem("authorization", JSON.stringify(authorization));
        //
        //     return;
        // }
        //
        // if (headers.role) {
        //     authorization.role = headers.role;
        // }
        //
        // if (headers.needsToVerifyEmail) {
        //     authorization.needsToVerifyEmail = headers.needsToVerifyEmail === "true";
        // }
        //
        // if (headers.needsToChangePassword) {
        //     authorization.needsToChangePassword = headers.needsToChangePassword === "true";
        // }
        //
        // if (headers.needsToSetupProfile) {
        //     authorization.needsToSetupProfile = headers.needsToSetupProfile === "true";
        // }
        //
        // localStorage.setItem("authorization", JSON.stringify(authorization));
    }
}

export default LocalDatabase;