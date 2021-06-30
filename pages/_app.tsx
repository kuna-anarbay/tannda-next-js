import React from "react";
import "../styles/index.css";
import Navbar from "../modules/layout/navbar.component";
import {ToastProvider} from "react-toast-notifications";
import {AppDataProvider} from "../modules/app/app-data-provider";
import {AppProps} from "next/app";

export default function App({Component, pageProps}: AppProps) {

    return (
        <ToastProvider>
            <AppDataProvider>
                <div>
                    <Navbar/>
                    <Component {...pageProps} />
                </div>
            </AppDataProvider>
        </ToastProvider>
    )
}

