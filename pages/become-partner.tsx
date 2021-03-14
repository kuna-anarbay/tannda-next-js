import React from "react";
import {featuresData} from "../public/static/features.data";
import useTranslation from "next-translate/useTranslation";
import {connect} from "react-redux";
import {BecomePartner} from "../models/BecomePartner";
import {AuthApi} from "../services/network/auth.api";
import store, {AppDispatch, RootState} from "../store/store";
import {GenericProps} from "../generic/generic.props";
import { useDispatch, useSelector } from 'react-redux';

function BecomePartnerPage(props: GenericProps<any, BecomePartner>) {

    const {t} = useTranslation();
    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData);
        console.log(formObject);

        dispatch(AuthApi.instance.becomePartner(formObject))
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
                            {featuresData.map(feature => (
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
                                    {t("becomePartner:form.title")}
                                </h2>
                                <p>
                                    {t("becomePartner:form.subtitle")}
                                </p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <label className="block mt-2">
                                    <span className="text-gray-700 field-required">
                                        {t("form:fullName")}
                                    </span>
                                    <input
                                        required
                                        name="fullName"
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder={t("form:fullName")}/>
                                </label>

                                <label className="block mt-2">
                                    <span className="text-gray-700 field-required">
                                        {t("form:centerName")}
                                    </span>
                                    <input
                                        required
                                        name="centerName"
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder={t("form:centerName")}/>
                                </label>
                                <label className="block mt-2">
                                    <span className="text-gray-700 field-required">
                                        {t("form:city")}
                                    </span>
                                    <select
                                        required
                                        name="cityId"
                                        placeholder={t("form:city")}
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
                                    <span className="text-gray-700 field-required">
                                         {t("form:phoneNumber")}
                                    </span>
                                    <input
                                        required
                                        name="phoneNumber"
                                        type="tel"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder={t("form:phoneNumber")}/>
                                </label>
                                <label className="block mt-2">
                                    <span className="text-gray-700 field-required">
                                        {t("form:email")}
                                    </span>
                                    <input
                                        required
                                        name="email"
                                        type="email"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder={t("form:email")}/>
                                </label>
                                <label className="block mt-2">
                                    <span className="text-gray-700">
                                        {t("form:comments")}
                                    </span>
                                    <textarea
                                        name="comments"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder={t("form:comments")} />
                                </label>
                                <label className="block mt-4">
                                    <button type="submit"
                                            className="bg-main text-white pl-6 pr-6 pt-2 pb-2 rounded-lg hover:bg-primary-900">
                                        {t("common:button.submit")}
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

const mapStateToProps = (state: RootState) => {
    console.log("GlobalState", state.auth.becomePartner);
    return state.auth.becomePartner;
}

export default connect(mapStateToProps)(BecomePartnerPage);