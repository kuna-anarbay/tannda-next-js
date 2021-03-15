import React from "react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import {useRouter} from "next/router";

export default function Header() {

    const {t} = useTranslation();
    const {locale} = useRouter();

    return (
        <div className="bg-secondaryBackground px-4 py-12 md:py-24">
            <div className="container mx-auto w-full">
                <div className="grid md:grid-cols-5 md:grid-flow-col md:gap-16">
                    <div className="flex flex-wrap content-center md:col-span-3">
                        <h1 className="text-4xl md:text-6xl font-bold">
                            <div>
                                {t("common:header.title")}
                            </div>
                            <div className="text-main">
                                {t("common:header.subtitle")}
                            </div>
                        </h1>
                        <h2 className="text-md md:text-lg text-gray-500 mt-4">
                            {t("common:header.description")}
                        </h2>
                        <Link href="/#become-partner">
                            <button
                                className="bg-main font-medium text-white pl-4 pr-4 pt-2 pb-2 rounded-lg mt-6 hover:bg-primary-900">
                                {t("common:button.becomePartner")}
                            </button>
                        </Link>
                    </div>
                    <div className="md:col-span-2">
                        <img
                            src={`https://tannda-storage.s3.eu-central-1.amazonaws.com/tannda/web/landing-product-${locale}.svg`}
                            alt={"Tañda header image"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}