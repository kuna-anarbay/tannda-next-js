import React from "react";
import {Provider} from "react-redux";
import {configureStore} from "../services/store";
import "../styles/index.css";
import Navbar from "../modules/layout/navbar.component";

function App({Component, pageProps}) {
    return (
        <Provider store={configureStore()}>
            <div>
                <Navbar/>
                <Component {...pageProps} />
            </div>
        </Provider>
    )
}


export default App;

