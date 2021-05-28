import React from "react";
import "../styles/index.css";
import Navbar from "../modules/layout/navbar.component";
import {ToastProvider, useToasts} from "react-toast-notifications";
import {RequestsProvider} from "@redux-requests/react";
import {createDriver} from "@redux-requests/axios";
import {axiosInstance} from "../services/store/http/AxiosInstance";

function App({Component, pageProps}) {

    return (
        <ToastProvider>
            <Body Component={Component} pageProps={pageProps} />
        </ToastProvider>
    )
}

function Body({Component, pageProps}) {
    const {addToast} = useToasts();

    return (
        <RequestsProvider requestsConfig={{
            driver: createDriver(axiosInstance()),
            onError: (error => {
                addToast(error.message, {appearance: "error", autoDismiss: true});
            })
        }}>

            <div>
                <Navbar/>
                <Component {...pageProps} />
            </div>

        </RequestsProvider>
    )
}

export default App;

