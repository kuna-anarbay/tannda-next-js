import React, {createContext, ReactNode, useEffect, useState} from "react";
import User from "../user/user.entity";
import {LoginRes} from "../auth/dto/login.dto";
import LocalDatabase from "../../services/localDatabase";
import AuthService from "../../services/auth.service";


type AppDataType = {
    currentUser: User | undefined;
    setUser: (body: LoginRes) => void;
    deleteUser: () => void;
};
const AppData = createContext<AppDataType>(undefined!);

export function AppDataProvider({children}: { children: ReactNode }) {
    const authService = new AuthService();
    const [currentUser, setUser] = useState(null);

    useEffect(() => {
        const loginRes = LocalDatabase.instance.getUser();
        if (loginRes) {
            configureUser(loginRes);
        }
        authService.refreshToken().then(loginRes => {
            configureUser(loginRes);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const configureUser = (data: LoginRes | null) => {
        LocalDatabase.instance.configure(data);
        if (data) {
            setUser(data.user);
        } else {
            setUser(null);
        }
    }

    return (
        <AppData.Provider value={
            {
                currentUser: currentUser,
                setUser: (loginRes) => configureUser(loginRes),
                deleteUser: () => configureUser(null)
            }
        }>
            {children}
        </AppData.Provider>
    );
}

export const useAppData = () => React.useContext(AppData);
