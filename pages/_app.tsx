import React from "react";
import NavigationComponent from "../components/common/navigation.component";
import {Provider} from "react-redux";
import {store} from "../store/store";
import useTranslation from "next-translate/useTranslation";
import Footer from "../components/common/footer.component";
import "../public/styles/globals.css";
import PageHead from "../components/common/page-head.component";


function App({Component, pageProps}) {
    const {t} = useTranslation();

    return (
        <Provider store={store}>
            <div>
                <PageHead/>
                <NavigationComponent/>
                <Component {...pageProps} />
                <Footer/>
            </div>
        </Provider>
    )
}


export default App;

