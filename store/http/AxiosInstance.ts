import axios from "axios";
import {Constants} from "../../public/Constants";
import {HTTPHeader} from "./HTTPHeader";

export const axiosInstance = () => {
    const instance = axios.create({
        baseURL: Constants.baseUrl,
        headers: HTTPHeader
    });

    return instance;
}