import axios, {AxiosInstance, AxiosResponse} from "axios";
import {Constants} from "../../public/Constants";
import LocalDatabase from "../localDatabase";

declare module "axios" {
    interface AxiosResponse<T = any> extends Promise<T> {
    }
}

export abstract class NetworkManager {

    protected readonly axiosInstance: AxiosInstance;
    private readonly baseUrl = Constants.baseUrl;

    // private readonly baseUrl = "http://192.168.1.174:8080";

    protected constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: this.defaultHeaders()
        });

        this.initializeResponseInterceptor();
    }

    public formDataHeaders = () => {
        let headers = this.defaultHeaders();
        headers["Content-Type"] = "multipart/form-data";

        return headers;
    }

    protected handleError = (error: any) => {
        return Promise.reject(error);
    }

    private initializeResponseInterceptor = () => {
        this.axiosInstance.interceptors.response.use(
            this.handleResponse,
            this.handleError,
        );
    };

    private handleResponse = ({data, headers}: AxiosResponse) => {
        LocalDatabase.instance.updateAuthorization(headers);

        return data;
    };

    private defaultHeaders = () => {
        let headers: any = {
            "Content-Type": "application/json"
        };

        const token = LocalDatabase.instance.getToken()?.value;
        if (token) {
            headers.Authorization = `Bearer ${token}`
        }

        return headers;
    }

}