import React from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

export default function Header() {

    const { t } = useTranslation();

    return (
        <div className="container mx-auto px-4 md:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-flow-col mt-16 mb-16 gap-4">
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
                    {/*<Image src={"/web/landing-header.png"} layout="fill" />*/}
                    <img src={"https://tannda-storage.s3.eu-central-1.amazonaws.com/tannda/web/landing-header.png"} alt={"Tañda header image"}/>
                </div>
            </div>
        </div>
    )
}