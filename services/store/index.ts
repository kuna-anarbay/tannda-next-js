import {QueryClient} from "react-query";


export const configureQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                staleTime: 1000 * 60 * 60 * 24
            }
        }
    });
}