import React from "react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

export default function Header() {

    const {t} = useTranslation();

    return (
        <div className="bg-secondaryBackground px-4 py-16 md:py-24">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 md:grid-flow-col gap-4">
                    <div className="flex flex-wrap content-center">
                        <h1 className="text-4xl md:text-6xl font-bold">
                            <div>
                                {t("common:header.title")}
                            </div>
                            <div className="text-main">
                                {t("common:header.subtitle")}
                            </div>
                        </h1>
                        <h2 className="text-md md:text-lg md:font-medium text-gray-500 mt-4">
                            {t("common:header.description")}
                        </h2>
                        <Link href="/become-partner">
                            <button className="bg-main font-medium text-white pl-4 pr-4 pt-2 pb-2 rounded-lg mt-6 hover:bg-primary-900">
                                {t("common:button.becomePartner")}
                            </button>
                        </Link>
                    </div>
                    <div>
                        <img src={"https://tannda-storage.s3.eu-central-1.amazonaws.com/tannda/web/landing-header.png"}
                             alt={"Tañda header image"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}