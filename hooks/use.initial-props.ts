import {useEffect, useState} from "react";
import CommonService from "../services/common.service";
import {useAppData} from "../modules/app/app-data-provider";

class Response<T> {
    loading: boolean = false;
    data?: T | null = null;
    error?: Error | null = null;

    constructor(data: T | null) {
        this.data = data;
    }
}

export default function useInitialProps<T>(url: string, cache?: string) {
    const {getCache} = useAppData();
    const [{loading, data, error}, setResponse] = useState(new Response<T>(getCache(cache)));
    const commonService = new CommonService();


    useEffect(() => {
        getData();
    }, []);


    const getData = async () => {
        setResponse({loading: true, data: data});
        try {
            const data = await commonService.get<T>(url);
            setResponse({loading: false, data: data});
        } catch (error) {
            setResponse({loading: false, error: error, data: data});
        }
    }


    return {loading, data, error};
}
