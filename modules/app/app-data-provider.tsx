import React, {createContext, ReactNode, useEffect, useRef, useState} from "react";
import User from "../user/user.entity";
import LocalDatabase from "../../services/localDatabase";
import AuthService from "../../services/auth.service";
import {useToasts} from "react-toast-notifications";
import {UserRole} from "../../models/role";
import {LoginResponseDto} from "../login/login.dto";
import {validate} from "class-validator";
import Course from "../../models/course";
import {Member} from "../../models/member";
import Section from "../../models/section";
import {Content} from "../../models/content";


type AppDataType = {
    role: UserRole | null;
    currentUser: User | null;
    setUser: (body: LoginResponseDto | null) => void;
    deleteUser: () => void;
    showError: (err: string) => void;
    showSuccess: (response: string) => void;
    setItem: (key: string | CacheItem, value: any) => void;
    getItem: (key: string | CacheItem, id?: number) => any;
    validate: (object: any) => Promise<void>;
};
const AppData = createContext<AppDataType>(undefined!);


export enum CacheItem {
    COURSES = "courses",
    MEMBERS = "members",
    SECTIONS = "sections",
    CONTENTS = "contents"
}

export function AppDataProvider({children}: { children: ReactNode }) {
    const cache = useRef({
        courses: Array<Course>(),
        members: Array<Member>(),
        sections: Array<Section>(),
        contents: Array<Content>()
    });
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


    const configureUser = (data: LoginResponseDto | null) => {
        LocalDatabase.instance.configure(data);
        if (data) {
            setRole(data.role);
            setUser(data.user);
        } else {
            setRole(null);
            setUser(null);
        }
    }


    const showError = (err: string) => {
        addToast(err, {autoDismiss: true, appearance: "error"});
    }


    const showSuccess = (response: string) => {
        addToast(response, {autoDismiss: true, appearance: "success"});
    }

    const setItem = (key: string | CacheItem, value: any) => {
        cache.current[key] = value;
    }

    const getItem = (key: string | CacheItem, id?: number) => {
        if (id) {
            return cache.current[key].find(obj => obj.id === id);
        }

        return cache.current[key];
    }


    const validateRequest = async (object: any): Promise<void> => {
        return new Promise((resolve, reject) => {
            validate(object).then(errors => {
                if (errors.length > 0) {
                    const res = Object.values(errors[0].constraints);
                    reject(new Error(res[0]));
                } else {
                    resolve();
                }
            }).catch(err => {
                reject(err);
            })
        })
    }


    return (
        <AppData.Provider value={
            {
                role: role,
                currentUser: currentUser,
                setUser: configureUser,
                deleteUser: () => configureUser(null),
                showError: showError,
                showSuccess: showSuccess,
                setItem: setItem,
                getItem: getItem,
                validate: validateRequest
            }
        }>
            {children}
        </AppData.Provider>
    );
}

export const useAppData = () => React.useContext(AppData);
