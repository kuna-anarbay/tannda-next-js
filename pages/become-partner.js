import React, { useState } from "react";
import data from "../public/data";
import useTranslation from "next-translate/useTranslation";
import FormItem from "../components/lib/form-item";

export default function BecomePartner() {
    const [ name, changeName ] = useState("");
    const {t} = useTranslation();

    const handleChange = (e) => {
        changeName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(name);
    }


    return (
        <div className="bg-gray-100 pt-8 pb-8">
            <div className="container mx-auto p-4 md:p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 md:grid-flow-col mt-16 mb-16 gap-8">
                    <div>
                        <h3 className="text-3xl font-semibold">
                            <p>
                                {t("common:header.title")}
                            </p>
                            <p className="text-main">
                                {t("common:header.subtitle")}
                            </p>
                        </h3>
                        <ul className="mt-6">
                            {data.features.map(feature => (
                                <li>
                                    <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
                                        <div className="p-2 bg-yellow-400 rounded-lg h-10 w-10">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium">
                                                {t(feature.title)}
                                            </h3>
                                            <p className="text-md text-gray-700">
                                                {t(feature.description)}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="p-8 rounded-lg bg-white">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Become partner
                                </h2>
                                <p>
                                    Scale your business
                                </p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <FormItem label="Full name" />

                                <label className="block mt-2">
                                    <span className="text-gray-700">Center name</span>
                                    <input onChange={handleChange}
                                           id="centerName"
                                           type="text"
                                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                           placeholder="Center name"/>
                                </label>
                                <label className="block mt-2">
                                    <span className="text-gray-700">City</span>
                                    <select
                                            onChange={handleChange}
                                            id="cityId"
                                             placeholder="Center name"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                        <option value="almaty">
                                            Almaty
                                        </option>
                                        <option value="astana">
                                            Astana
                                        </option>
                                    </select>
                                </label>
                                <label className="block mt-2">
                                    <span className="text-gray-700">Phone number</span>
                                    <input
                                            onChange={handleChange}
                                            id="phoneNumber"
                                            type="tel"
                                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                           placeholder="Phone number"/>
                                </label>
                                <label className="block mt-2">
                                    <span className="text-gray-700">Email</span>
                                    <input onChange={handleChange}
                                           id="email"
                                           type="email"
                                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                           placeholder="Email"/>
                                </label>
                                <label className="block mt-2">
                                    <span className="text-gray-700">Comments</span>
                                    <textarea
                                            onChange={handleChange}
                                            id="comments"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            placeholder="Comments"/>
                                </label>
                                <label className="block mt-4">
                                    <button type="submit" className="bg-main text-white pl-6 pr-6 pt-2 pb-2 rounded-lg hover:bg-primary-900">
                                        Submit
                                    </button>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}