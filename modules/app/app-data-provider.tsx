import React, {createContext, ReactNode, useEffect} from "react";
import User from "../user/user.entity";
import {useMutation} from "react-query";
import {axiosInstance} from "../../services/store/http/AxiosInstance";
import {URLPath} from "../../services/store/http/URLPath";
import {LoginRes} from "../auth/dto/login.dto";
import LocalDatabase from "../../services/localDatabase";

async function getCurrentUser() {
    const response = await axiosInstance().post<LoginRes>(URLPath.auth.refreshToken);
    LocalDatabase.instance.configure(response.data);
    return response.data.user;
}

type AppDataType = {
    currentUser: User | undefined;
};
const AppData = createContext<AppDataType>(undefined!);

export function AppDataProvider({children}: { children: ReactNode }) {
    const {data: user, mutate} = useMutation<User, Error>("currentUser", getCurrentUser)
    useEffect(() => {
        mutate();
    }, []);


    return <AppData.Provider value={{currentUser: user}}>{children}</AppData.Provider>
}

export const useAppData = () => React.useContext(AppData);
