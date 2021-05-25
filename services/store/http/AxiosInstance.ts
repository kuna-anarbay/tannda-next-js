import axios from "axios";
import {HTTPHeader} from "./HTTPHeader";
import config from "../../../config";

export const axiosInstance = () => {
    return axios.create({
        baseURL: config.baseURL,
        headers: HTTPHeader
    });
}
