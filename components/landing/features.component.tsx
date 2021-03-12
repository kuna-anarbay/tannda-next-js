import React from "react";
import {features} from "../../public/static/features";
import useTranslation from "next-translate/useTranslation";

export default function Features() {

    const {t} = useTranslation();
    return (
        <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-main font-semibold tracking-wide uppercase">
                        {t("features:header.title")}
                    </h2>
                    <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {t("features:header.subtitle")}
                    </p>
                    <p className="mt-4 max-w-3xl text-xl text-gray-500 lg:mx-auto">
                        {t("features:header.description")}
                    </p>
                </div>
                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-10 md:gap-y-12">
                        {features.map(feature => (
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div
                                        className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-900 text-white">
                                        { feature.icon }
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <dt className="text-lg leading-6 font-medium text-gray-900">
                                        {t(feature.title)}
                                    </dt>
                                    <dd className="mt-2 text-base text-gray-500">
                                        {t(feature.description)}
                                    </dd>
                                </div>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}