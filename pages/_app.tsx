import React from "react";
import {Provider} from "react-redux";
import {store} from "../services/store/store";
import useTranslation from "next-translate/useTranslation";
import "../public/styles/index.css";


function App({Component, pageProps}) {
    const {t} = useTranslation();

    return (
        <Provider store={store}>
            <div>
                <Component {...pageProps} />
            </div>
        </Provider>
    )
}


export default App;

