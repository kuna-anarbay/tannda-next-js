import {QueryClient} from "react-query";


export const configureQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: true
            }
        }
    });
}
