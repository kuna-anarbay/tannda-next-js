import React from "react";
import Link from "next/link";
import {contacts} from "../../public/static/contacts.data";
import useTranslation from "next-translate/useTranslation";

export default function Contacts() {

    const {t} = useTranslation();

    return (
        <div className="grid md:grid-flow-col md:grid-cols-5">
            <div className="bg-gray-50 py-8 px-4 md:px-20 md:py-16 md:col-span-2">
                <div>
                    <div>
                        <h2 className="text-base text-main font-semibold tracking-wide uppercase">
                            {t("landing:contacts.title")}
                        </h2>
                        <p className="mt-2 text-2xl leading-8 font-bold tracking-tight text-gray-900 md:text-3xl">
                            {t("landing:contacts.subtitle")}
                        </p>
                    </div>
                    <div className="mt-4">
                        <ul>
                            { contacts.map(contact => (
                                <li className="px-3 py-1.5 my-0.5 text-gray-600 space-x-2.5 rounded-md hover:bg-blue-50 hover:text-main">
                                    <i className={contact.icon} />
                                    <a href={contact.link}>
                                        { contact.value}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-white py-8 px-4 md:px-20 md:py-16 md:col-span-3">
                <form>
                    <div className="my-2">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            {t("form:full-name")}
                        </label>
                        <div className="mt-1 rounded-md">
                            <input type="text" name="price" id="price"
                                   className="focus:ring-primary-500 focus:border-primary-500 w-full sm:text-sm border-gray-300 rounded-md"
                                   placeholder={t("form:full-name")} />
                        </div>
                    </div>
                    <div className="my-2">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            {t("form:phone-number")}
                        </label>
                        <div className="mt-1 rounded-md">
                            <input type="text" name="price" id="price"
                                   className="focus:ring-primary-500 focus:border-primary-500 w-full sm:text-sm border-gray-300 rounded-md"
                                   placeholder={t("form:phone-number")} />
                        </div>
                    </div>
                    <div className="my-2">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            {t("form:question")}
                        </label>
                        <div className="mt-1 rounded-md">
                                    <textarea rows={3} name="price" id="price"
                                              className="focus:ring-primary-500 focus:border-primary-500 w-full sm:text-sm border-gray-300 rounded-md"
                                              placeholder={t("form:question")} />
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                                className="bg-main text-white px-6 py-2 rounded-lg md:px-8 hover:bg-primary-900">
                            {t("common:button.send")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}