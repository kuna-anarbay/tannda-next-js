import React from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";

export default function AboutUs() {
    const {t} = useTranslation();
    const {locale} = useRouter();

    return (
        <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="grid md:grid-flow-col gap-8 md:gap-12">
                <div className="md:col-span-2">
                    <div className="rounded-xl shadow-md p-6">
                        <img
                            src={`https://tannda-storage.s3.eu-central-1.amazonaws.com/tannda/web/landing-product-${locale}.svg`}
                            alt={"Tañda header image"}/>
                    </div>
                </div>
                <div className="flex flex-wrap content-center w-full md:col-span-3">
                    <div>
                        <h2 className="text-base text-main font-semibold tracking-wide uppercase">
                            {t("landing:about-us.title")}
                        </h2>
                        <h1 className="mt-2 text-4xl font-bold">
                            <div>
                                {t("landing:about-us.subtitle")}
                            </div>
                        </h1>
                    </div>
                    <h2 className="text-lg text-gray-500 mt-4">
                        {t("landing:about-us.description")}
                    </h2>
                </div>
            </div>
        </div>
    )
}