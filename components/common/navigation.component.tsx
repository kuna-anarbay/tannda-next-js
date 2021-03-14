import React, {useState} from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import {Menu, Transition} from "@headlessui/react";
import {useRouter} from "next/router";
import {languages} from "../../public/static/languages.data";

export default function NavigationComponent() {
    const router = useRouter();
    const {t} = useTranslation();
    const {locale} = router;

    const getClassName = (active: boolean, key: string) => {
        if (key == locale) {
            return "bg-blue-100 text-main"
        }
        if (active) {
            return "bg-blue-50 text-main"
        }
        return "text-gray-800"
    }
    const langChanger = () => (
        <Menu>
            {({open}) => (
                <>
                    <Menu.Button
                        className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium inline-flex hover:text-gray-900 hover:bg-blue-50"
                        aria-expanded="false">
                        <span>
                            {t("common:navigation.language")}
                        </span>
                        <svg className="text-gray-700 ml-2 h-5 w-5 group-hover:text-gray-900"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             aria-hidden="true">
                            <path fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"/>
                        </svg>
                    </Menu.Button>
                    <Transition
                        as={React.Fragment}
                        show={open}
                        leave="transition duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Menu.Items
                            static
                            className="absolute mt-12 w-44 rounded-lg bg-white p-2 shadow-md focus:outline-none"
                        >
                            { languages.map(lang => (
                                <Menu.Item>
                                    {({active}) => (
                                        <div className={`${getClassName(active, lang.key)} rounded-md`}>
                                            <Link href={router.pathname} locale={lang.key}>
                                                <a className="cursor-pointer block w-full px-3 py-2 text-sm font-medium">
                                                    {lang.value}
                                                </a>
                                            </Link>
                                        </div>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    )


    return (
        <div style={{ height: "64px" }}>
            <nav className="bg-white top-0 w-full fixed shadow-sm">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {langChanger()}
                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href={"/"}>
                                    <img className="block lg:hidden h-8 w-auto"
                                         src="https://tannda-storage.s3.eu-central-1.amazonaws.com/tannda/web/logo-without-container.svg"
                                         alt="Tañda"/>
                                </Link>
                                <Link href={"/"}>
                                    <img className="hidden lg:block h-8 w-auto"
                                         src="https://tannda-storage.s3.eu-central-1.amazonaws.com/tannda/web/logo-with-text.svg"
                                         alt="Tañda"/>
                                </Link>
                            </div>
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    {langChanger()}
                                </div>
                            </div>
                        </div>
                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="ml-3 relative">
                                <div>
                                    <Link href="/become-partner">
                                        <button className="bg-blue-50 text-main text-sm font-medium px-3 py-2 rounded-md hover:bg-blue-100">
                                            {t("common:button.becomePartner")}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}