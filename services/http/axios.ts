import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import LocalDatabase from "../localDatabase";

declare module "axios" {
    interface AxiosResponse<T = any> extends Promise<T> {
    }
}

export default abstract class NetworkManager {

    protected readonly instance: AxiosInstance;
    private readonly baseUrl = "http://localhost:8080";

    protected constructor() {
        this.instance = axios.create({
            baseURL: this.baseUrl,
            headers: this.defaultHeaders()
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
        return Promise.reject(error);
    };

    private initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this.handleResponse,
            this.handleError,
        );
    };

    private initializeRequestInterceptor = () => {
        this.instance.interceptors.request.use(
            this.handleRequest,
            this.handleError
        )
    }

    private handleRequest = (request: AxiosRequestConfig) => {
        return {
            ...request,
            headers: this.defaultHeaders()
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
