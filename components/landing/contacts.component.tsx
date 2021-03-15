import React, {useEffect, useState} from "react";
import {contacts} from "../../public/static/contacts.data";
import useTranslation from "next-translate/useTranslation";
import Alert from "../common/alert.component";
import {connect, useDispatch} from 'react-redux';
import {AuthApi} from "../../services/network/auth.api";
import {AppDispatch, RootState} from "../../store/store";
import {GenericState} from "../../generic/generic.state";
import {BecomePartner} from "../../models/BecomePartner";
import {City} from "../../models/City";
import {useRouter} from "next/router";
import {translate} from "../../models/Translatable";

function Contacts(props: GenericState<BecomePartner>) {
    const [cities, updateCities] = useState(Array<City>());
    useEffect(() => {
        function getCities(count: number) {
            if (count === 3) {
                return;
            }
            const result = localStorage.getItem("cities");
            const citiesList = JSON.parse(result) as Array<City>;

            if (citiesList) {
                updateCities(citiesList);
            } else {
                setTimeout(function () {
                    getCities(count + 1);
                }, count * 1000);
            }
        }

        if (cities.length === 0) {
            getCities(1);
        }
    });

    const {locale} = useRouter();
    const {loading, error, response} = props;
    const {t} = useTranslation();
    const dispatch: AppDispatch = useDispatch();

    const becomePartner = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData);
        const requestData = {
            ...formObject,
            city: {
                id: parseInt(formObject.city as string)
            },
            language: locale
        };
        console.log(requestData);
        dispatch(AuthApi.instance.becomePartner(requestData))
    }


    return (
        <div className="container mx-auto px-4">
            <div className="grid md:grid-flow-col md:grid-cols-3 md:gap-12">
                <div className="py-8 md:py-16 md:col-span-1">
                    <div>
                        <div>
                            <p className="text-base text-main font-semibold tracking-wide uppercase">
                                {t("landing:contacts.title")}
                            </p>
                            <p className="mt-2 text-2xl leading-8 font-bold tracking-tight text-gray-900 md:text-3xl">
                                {t("landing:contacts.subtitle")}
                            </p>
                        </div>
                        <div className="mt-4">
                            <ul>
                                {contacts.map(contact => (
                                    <li key={contact.value} className="px-3 py-1.5 my-0.5 text-gray-600 space-x-2.5 rounded-md hover:bg-blue-50 hover:text-main">
                                        <i className={contact.icon}/>
                                        <a href={contact.link}>
                                            {contact.value}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>
                </div>
                <div className="bg-white py-8 md:py-16 md:col-span-2">
                    <form onSubmit={becomePartner} id="become-partner">
                        <h2 className="text-xl font-medium md:text-2xl">
                            {t("landing:become-partner.title")}
                        </h2>
                        <p className="text-gray-500">
                            {t("landing:become-partner.subtitle")}
                        </p>
                        <div className="mt-4">
                            <div>
                                <label htmlFor="price"
                                       className="block text-sm font-medium text-gray-700 field-required">
                                    {t("form:full-name")}
                                </label>
                                <div className="mt-1 rounded-md">
                                    <input required type="text" name="name" id="price"
                                           className="focus:ring-primary-500 focus:border-primary-500 w-full sm:text-sm border-gray-300 rounded-md"
                                           placeholder={t("form:full-name")}/>
                                </div>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:grid-flow-col gap-4 mt-4">
                            <div>
                                <label htmlFor="price"
                                       className="block text-sm font-medium text-gray-700 field-required">
                                    {t("form:city")}
                                </label>
                                <div className="mt-1 rounded-md">
                                    <select
                                        required
                                        name="city"
                                        placeholder={t("form:city")}
                                        className="w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-primary-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                        {cities.map(city => (
                                            <option value={city.id}>
                                                {translate(city.title, locale)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="price"
                                       className="block text-sm font-medium text-gray-700 field-required">
                                    {t("form:center-name")}
                                </label>
                                <div className="mt-1 rounded-md">
                                    <input required type="text" name="centerName" id="price"
                                           className="focus:ring-primary-500 focus:border-primary-500 w-full sm:text-sm border-gray-300 rounded-md"
                                           placeholder={t("form:center-name")}/>
                                </div>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:grid-flow-col gap-4 mt-4">
                            <div>
                                <label htmlFor="price"
                                       className="block text-sm font-medium text-gray-700 field-required">
                                    {t("form:phone-number")}
                                </label>
                                <div className="mt-1 rounded-md">
                                    <input required type="text" name="phone" id="price"
                                           className="focus:ring-primary-500 focus:border-primary-500 w-full sm:text-sm border-gray-300 rounded-md"
                                           placeholder={t("form:phone-number")}/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="price"
                                       className="block text-sm font-medium text-gray-700 field-required">
                                    {t("form:email")}
                                </label>
                                <div className="mt-1 rounded-md">
                                    <input required type="text" name="email" id="price"
                                           className="focus:ring-primary-500 focus:border-primary-500 w-full sm:text-sm border-gray-300 rounded-md"
                                           placeholder={t("form:email")}/>
                                    <small className="text-gray-500 text-xs">
                                        {t("landing:become-partner.emailRequired")}
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="my-2">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                {t("form:comments")}
                            </label>
                            <div className="mt-1 rounded-md">
                            <textarea rows={3} name="message" id="price"
                                      className="focus:ring-primary-500 focus:border-primary-500 w-full sm:text-sm border-gray-300 rounded-md"
                                      placeholder={t("form:comments")}/>
                            </div>
                        </div>
                        <div>
                            {error ? <Alert initialVisible={true} type={"error"} title={error.error}
                                            text={error.message}/> : null}
                            {response ? <Alert initialVisible={true} type={"success"}
                                               title={t("landing:become-partner.success.title")}
                                               text={t("landing:become-partner.success.text")}/> : null}
                            <button disabled={loading} type="submit"
                                    className={`bg-${loading ? "gray-700" : "main"} flex space-x-2.5 text-white px-6 py-2 rounded-lg md:px-8 hover:bg-${loading ? "gray-700" : "primary-900"}`}>
                                {loading ? <i className="animate-spin fas fa-spinner"/> : null}
                                <div>
                                    {t("common:button.submit")}
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: RootState) => {
    return state.auth.becomePartner;
}

export default connect(mapStateToProps)(Contacts);