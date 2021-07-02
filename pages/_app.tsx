import "../styles/index.css";
import Navbar from "../modules/layout/navbar.component";
import {ToastProvider} from "react-toast-notifications";
import {AppDataProvider} from "../modules/app/app-data-provider";
import {AppProps} from "next/app";
import Head from "next/head";
import {images} from "../resources/images";

export default function App({Component, pageProps}: AppProps) {

    return (
        <ToastProvider>
            <AppDataProvider>
                <div>
                    <Head>
                        <title>Meta Tags — Preview, Edit and Generate</title>
                        <meta name="title" content="Meta Tags — Preview, Edit and Generate"/>
                        <meta name="description"
                              content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"/>

                        <meta property="og:type" content="website"/>
                        <meta property="og:url" content="https://tannda.kz/"/>
                        <meta property="og:title" content="Meta Tags — Preview, Edit and Generate"/>
                        <meta property="og:description"
                              content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"/>
                        <meta property="og:image"
                              content={images.favicon.chrome192}/>
                    </Head>

                    <Navbar/>
                    <Component {...pageProps} />
                </div>
            </AppDataProvider>
        </ToastProvider>
    )
}

