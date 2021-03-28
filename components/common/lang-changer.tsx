import React from "react";
import {Menu, Transition} from "@headlessui/react";
import {languages} from "../../public/static/languages.data";
import Link from "next/link";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import {ChevronDown, ChevronUp} from "../../public/static/icons";


export default function LangChanger() {

    const {locale, pathname} = useRouter();
    const {t} = useTranslation();

    const getClassName = (active: boolean, key: string) => {
        if (key == locale) {
            return "bg-blue-100 text-main"
        }
        if (active) {
            return "bg-blue-50 text-main"
        }
        return "text-gray-800"
    }

    return (
        <Menu>
            {({open}) => (
                <>
                    <Menu.Button
                        className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium inline-flex hover:text-gray-900 hover:bg-blue-50"
                        aria-expanded="false">
                        <span>
                            {t("common:navigation.language")}
                        </span>
                        {open ? <ChevronUp className="text-gray-700 ml-2 h-5 w-5 group-hover:text-gray-900"/> :
                            <ChevronDown className="text-gray-700 ml-2 h-5 w-5 group-hover:text-gray-900"/>}
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
                            {languages.map(lang => (
                                <Menu.Item key={lang.key}>
                                    {({active}) => (
                                        <div className={`${getClassName(active, lang.key)} rounded-md`}>
                                            <Link href={pathname} locale={lang.key}>
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
}