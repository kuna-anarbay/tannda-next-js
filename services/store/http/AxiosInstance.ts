import axios from "axios";
import {HTTPHeader} from "./HTTPHeader";

export const axiosInstance = () => {
    return axios.create({
        baseURL: "http://localhost:8080",
        headers: HTTPHeader()
    });
}
