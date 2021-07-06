import "../styles/index.css";
import {ToastProvider} from "react-toast-notifications";
import {AppDataProvider} from "../modules/app/app-data-provider";
import {AppProps} from "next/app";
import Head from "next/head";
import {images} from "../resources/images";
import {strings} from "../resources/strings";
import HeaderView from "../modules/layout/header.view";
import FooterView from "../modules/layout/footer.view";

export default function App({Component, pageProps}: AppProps) {

    return (
        <ToastProvider>
            <AppDataProvider>
                <div>
                    <Head>
                        <meta charSet="UTF-8"/>
                        <meta name="keywords" content="HTML, CSS, JavaScript"/>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                        <meta name="theme-color" content="#054EA1"/>

                        {/* Website info */}
                        <title>{strings.appTitle}</title>
                        <meta name="title" content={strings.appTitle}/>
                        <meta name="description" content={strings.appDescription}/>

                        {/* Favicon set */}
                        <link rel="apple-touch-icon" href={images.favicon.appleTouch}/>
                        <link rel="icon" href={images.favicon.favicon}/>
                        <link rel="icon" href={images.favicon.favicon16} sizes="16x16" type="image/png"/>
                        <link rel="icon" href={images.favicon.favicon32} sizes="32x32" type="image/png"/>
                        <link rel="manifest" href={images.manifest}/>

                        {/* Open graph */}
                        <meta property="og:type" content="website"/>
                        <meta property="og:url" content="https://tannda.kz/"/>
                        <meta property="og:title" content={strings.appTitle}/>
                        <meta property="og:description" content={strings.appDescription}/>
                        <meta property="og:image" content={images.favicon.chrome192}/>
                    </Head>

                    <HeaderView/>
                    <div className={"pt-14"} style={{ minHeight: "calc(80vh)" }}>
                        <Component {...pageProps} />
                    </div>
                    <FooterView/>
                </div>
            </AppDataProvider>
        </ToastProvider>
    )
}

