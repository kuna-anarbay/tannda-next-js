import React from "react";
import {contacts} from "../../public/static/contacts.data";
import useTranslation from "next-translate/useTranslation";

export default function Footer() {

    const {t} = useTranslation();

    return (
        <div className="bg-gray-800 py-6 md:py-8">
            <div className="container mx-auto">
                <div className="flex justify-center space-x-6">
                    {contacts.map(contact => (
                        <a href={contact.link}
                           key={contact.link}
                           className="text-white duration-150 ease-in-out transform hover:-translate-y-0.5 hover:scale-100">
                            <i className={contact.icon + " text-md md:text-lg"}/>
                        </a>
                    ))}
                </div>
                <div>
                    <h3 className="text-center text-sm mt-4 text-gray-400 md:text-md">
                        {t("common:footer.title")}
                    </h3>
                </div>
            </div>
        </div>
    )
}