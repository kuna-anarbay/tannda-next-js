import React, {createContext, ReactNode, useEffect, useRef, useState} from "react";
import User from "../user/user.entity";
import {LoginRes} from "../auth/dto/login.dto";
import LocalDatabase from "../../services/localDatabase";
import AuthService from "../../services/auth.service";
import {useToasts} from "react-toast-notifications";
import {UserRole} from "../../models/role";


type AppDataType = {
    role: UserRole | null;
    currentUser: User | null;
    setUser: (body: LoginRes | null) => void;
    deleteUser: () => void;
    showError: (err) => void;
    showSuccess: (response: string) => void;
    cache: (key: string, value: any) => void;
    getCache: (key: string) => any;
};
const AppData = createContext<AppDataType>(undefined!);

export function AppDataProvider({children}: { children: ReactNode }) {
    const cache = useRef({});
    const authService = new AuthService();
    const {addToast} = useToasts();
    const [currentUser, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const loginRes = LocalDatabase.instance.getUser();
        if (loginRes) {
            configureUser(loginRes);
        }
        authService.refreshToken().then(loginRes => {
            configureUser(loginRes);
        }).catch((err) => {
            configureUser(null);
            console.log(err);
        })
    }, []);


    const configureUser = (data: LoginRes | null) => {
        LocalDatabase.instance.configure(data);
        if (data) {
            setRole(data.role);
            setUser(data.user);
        } else {
            setRole(null);
            setUser(null);
        }
    }


    const showError = (err) => {
        addToast(err, {autoDismiss: true, appearance: "error"});
    }


    const showSuccess = (response: string) => {
        addToast(response, {autoDismiss: true, appearance: "success"});
    }


    const setCache = (key: string, value: any) => {
        cache.current[key] = value;
    }

    const getCache = (key: string) => {
        return cache.current[key];
    }


    return (
        <AppData.Provider value={
            {
                role: role,
                currentUser: currentUser,
                setUser: (loginRes) => configureUser(loginRes),
                deleteUser: () => configureUser(null),
                showError: showError,
                showSuccess: showSuccess,
                cache: setCache,
                getCache: getCache
            }
        }>
            {children}
        </AppData.Provider>
    );
}

export const useAppData = () => React.useContext(AppData);
