import axios, {AxiosRequestConfig} from "axios";
import {HTTPHeader} from "./HTTPHeader";
import {QueryKey, useMutation, useQuery} from "react-query";

export const axiosInstance = () => {
    return axios.create({
        baseURL: "http://localhost:8080",
        headers: HTTPHeader()
    });
}

export const queryRequest = <T>(name: QueryKey, config: AxiosRequestConfig) => {
    return useQuery<T, any>(name, () => (
        axiosInstance().request<T>(config).then(res => res.data)
    ));
}

export const mutationRequest = <Res, Req = void>(config: AxiosRequestConfig) => {
    return useMutation<Res, any, Req>((data) => (
        axiosInstance().request<Res>({
            ...config,
            data: data
        }).then(res => res.data)
    ));
}
