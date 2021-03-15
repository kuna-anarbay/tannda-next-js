import React from "react";
import useTranslation from "next-translate/useTranslation";

export default function Product() {

    const {t} = useTranslation();

    return (
        <div className="py-16">
            <div className="container mx-auto px-4 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-flow-col gap-12">
                    <div className="flex flex-wrap content-center md:col-span-2">
                        <div>
                            <h2 className="text-base text-main font-semibold tracking-wide uppercase">
                                {t("landing:product.title")}
                            </h2>
                            <p className="mt-2 text-2xl leading-8 font-bold tracking-tight text-gray-900 md:text-3xl">
                                {t("landing:product.subtitle")}
                            </p>
                            <p className="mt-4 text-sm leading-8 text-gray-700 md:text-lg">
                                {t("landing:product.description")}
                            </p>
                            <p className="mt-3 font-medium text-main">
                                {t("landing:product.meta")}
                            </p>
                        </div>
                    </div>
                    <div className="md:col-span-1">
                        <img className="px-4"
                             src="https://tannda-storage.s3.eu-central-1.amazonaws.com/tannda/web/iPhone-explore.png"
                             alt="Tañda"/>
                    </div>
                    <div className="md:col-span-1">
                        <img className="px-4"
                             src="https://tannda-storage.s3.eu-central-1.amazonaws.com/tannda/web/iPhone-course.png"
                             alt="Tañda"/>
                    </div>
                </div>
            </div>
        </div>
    )
}