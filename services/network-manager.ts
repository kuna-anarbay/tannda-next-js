import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import LocalDatabase from "./localDatabase";
import config from "../config";


declare module "axios" {
    interface AxiosResponse<T = any> extends Promise<T> {
    }
}

export default abstract class NetworkManager {

    protected readonly instance: AxiosInstance;
    protected readonly multipart: AxiosInstance;
    private readonly baseUrl = config.baseUrl;


    constructor() {
        this.instance = axios.create({
            baseURL: this.baseUrl,
            headers: this.defaultHeaders()
        });
        this.multipart = axios.create({
            baseURL: this.baseUrl,
            headers: this.formDataHeaders()
        });

        this.initializeResponseInterceptor();
        this.initializeRequestInterceptor();
    }


    public formDataHeaders = () => {
        let headers = this.defaultHeaders();
        headers["Content-Type"] = "multipart/form-data";

        return headers;
    }


    protected handleError = (error: AxiosError) => {
        const {response} = error;
        if (response && response.data && response.data.message) {
            const message = response.data.message as string;
            return Promise.reject(new Error(message));
        } else {
            return Promise.reject(error);
        }
    };


    private initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this.handleResponse,
            this.handleError,
        );
        this.multipart.interceptors.response.use(
            this.handleResponse,
            this.handleError,
        );
    };


    private initializeRequestInterceptor = () => {
        this.instance.interceptors.request.use(
            this.handleRequest,
            this.handleError
        )
        this.multipart.interceptors.request.use(
            this.handleMultipartRequest,
            this.handleError,
        );
    }


    private handleRequest = (request: AxiosRequestConfig) => {
        return {
            ...request,
            headers: this.defaultHeaders()
        };
    }


    private handleMultipartRequest = (request: AxiosRequestConfig) => {
        return {
            ...request,
            headers: this.formDataHeaders()
        };
    }


    private handleResponse = ({data}: AxiosResponse) => {
        return data;
    };


    private defaultHeaders = () => {
        let headers: any = {
            "Content-Type": "application/json"
        };
        const data = LocalDatabase.instance.getUser();
        if (data) {
            headers["Authorization"] = `Bearer ${data.accessToken}`;
            headers["Refresh-Token"] = `${data.refreshToken}`;
        }

        return headers;
    }


}
