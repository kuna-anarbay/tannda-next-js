import {useEffect, useState} from "react";
import CommonService from "../services/common.service";

interface CachItem<T> {
    deadline: Date;
    item: T;
}

const CACHE = {};

class Response<T> {
    loading: boolean = false;
    data?: T | null = null;
    error?: Error | null = null;
}

export default function useInitialProps<T>(url: string) {
    const [{loading, data, error}, setResponse] = useState(new Response<T>());
    const commonService = new CommonService();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setResponse({loading: true});
        try {
            const data = await commonService.get<T>(url);
            setResponse({loading: false, data: data});
        } catch (error) {
            setResponse({loading: false, error: error});
        }
    }

    return {loading, data, error};
}
