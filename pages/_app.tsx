import React from "react";
import "../styles/index.css";
import Navbar from "../modules/layout/navbar.component";
import {ToastProvider, useToasts} from "react-toast-notifications";
import {configureQueryClient} from "../services/store";
import {QueryClientProvider} from "react-query";

function App({Component, pageProps}) {

    return (
        <ToastProvider>
            <Body Component={Component} pageProps={pageProps}/>
        </ToastProvider>
    )
}

function Body({Component, pageProps}) {
    const {addToast} = useToasts();

    return (
        <QueryClientProvider client={configureQueryClient()}>
            <div>
                <Navbar/>
                <Component {...pageProps} />
            </div>
        </QueryClientProvider>
    )
}

export default App;

