import React from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

export default function CTA() {
    const {t} = useTranslation();

    return (
        <div>
            <div
                className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    <span className="block">Ready to dive in?</span>
                    <span className="block text-main">Start your free trial today.</span>
                </h2>
                <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                    <button className="bg-main font-medium text-white pl-4 pr-4 pt-2 pb-2 rounded-lg mt-6 hover:bg-primary-900">
                        <Link href="/become-partner">
                            {t("common:button.becomePartner")}
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}