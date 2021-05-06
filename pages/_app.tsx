import React from "react";
import '../styles/globals.scss'
import {Provider} from "react-redux";
import {configureStore} from "../services/store/store";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";

function MyApp({Component, pageProps}) {
    const {t} = useTranslation();

    return (
        <Provider store={configureStore()}>
            <div>
                <Head>
                    <title>Tañda</title>
                    <link rel="canonical" href="https://tannda.kz/"/>
                    <link rel="alternate" href="https://tannda.kz/en" hrefLang="en-US"/>
                    <link rel="alternate" href="https://tannda.kz/kz" hrefLang="kz-KZ"/>
                    <link rel="icon" type="image/png" href="/favicon/favicon-16x16.png" sizes="16x16"/>
                    <link rel="icon" type="image/png" href="/favicon/favicon-32x32.png" sizes="32x32"/>
                    <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png"/>
                    <link rel="icon" href="/favicon/favicon.ico"/>

                    <meta name="description" content={t("common:headData.description")}/>
                    <meta name="keywords" content={"Tañda, таңда, танда, образовательные центры, образовательные курсы"} />
                    <meta property="og:title" content={t("common:headData.title")}/>
                    <meta property="og:description" content={t("common:headData.description")}/>
                    <meta property="og:image" content="/favicon/android-chrome-192x192.png"/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:site_name" content="Tañda"/>
                    <meta property="og:locale" content={t("common:headData.ogLocale")}/>

                </Head>
                <Component {...pageProps} />
            </div>
        </Provider>
    )
}


export default MyApp;

