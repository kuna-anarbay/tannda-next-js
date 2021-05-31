import React from "react";
import "../styles/index.css";
import Navbar from "../modules/layout/navbar.component";
import {ToastProvider} from "react-toast-notifications";
import {configureQueryClient} from "../services/store";
import {QueryClientProvider} from "react-query";
import {AppDataProvider} from "../modules/app/app-data-provider";
import {ReactQueryDevtools} from "react-query/devtools";

function App({Component, pageProps}) {

    return (
        <ToastProvider>
            <QueryClientProvider client={configureQueryClient()}>
                <AppDataProvider>
                    <div>
                        <Navbar/>
                        <Component {...pageProps} />
                    </div>
                </AppDataProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </ToastProvider>
    )
}

export default App;

