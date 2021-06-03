import React from "react";
import "../styles/index.css";
import Navbar from "../modules/layout/navbar.component";
import {ToastProvider} from "react-toast-notifications";
import {AppDataProvider} from "../modules/app/app-data-provider";
import moment from "moment";

moment.locale("ru");

function App({Component, pageProps}) {

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

export default App;

