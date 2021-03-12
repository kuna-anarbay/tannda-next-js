import React from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

export default function Product() {

    const {t} = useTranslation();

    return (
        <div className="bg-secondaryBackground py-16">
            <div className="container mx-auto px-4 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 md:grid-flow-col gap-4">
                    <div className="flex flex-wrap content-center">
                        <h1 className="text-6xl font-bold">
                            <div>
                                {t("common:header.title")}
                            </div>
                            <div>
                                {t("common:header.subtitle")}
                            </div>
                        </h1>
                        <h2 className="text-lg font-medium text-gray-500 mt-4">
                            {t("common:header.description")}
                        </h2>
                        <button className="bg-main text-white pl-4 pr-4 pt-2 pb-2 rounded-lg mt-6 hover:bg-primary-900">
                            <Link href="/become-partner">
                                {t("common:button.becomePartner")}
                            </Link>
                        </button>
                    </div>
                    <div>
                        <img className="h-96" src={"https://tannda-storage.s3.eu-central-1.amazonaws.com/tannda/web/landing-product-ru.png"}
                             alt={"Tañda header image"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}