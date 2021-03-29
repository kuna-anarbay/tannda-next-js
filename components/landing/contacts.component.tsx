import React from "react";
import {contacts} from "../../public/static/contacts.data";
import useTranslation from "next-translate/useTranslation";
import Alert from "../common/alert.component";
import {useDispatch} from 'react-redux';
import {useRouter} from "next/router";
import {translate} from "../../models/Translatable";
import {useQuery} from "@redux-requests/react";
import {CityAction} from "../../store/actions/city.action";

function Contacts() {
    const {data, loading, error} = useQuery({type: CityAction.getCities});
    const {locale} = useRouter();
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const becomePartner = (e) => {
        e.preventDefault();

        console.log(typeof e.target);
        const vars = new FormData(e.target);
        console.log(vars);

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
                                    <li key={contact.value}
                                        className="px-3 py-1.5 my-0.5 text-gray-600 space-x-2.5 rounded-md hover:bg-blue-50 hover:text-main">
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
                                        name="city.id"
                                        placeholder={t("form:city")}
                                        className="w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-primary-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                        {data ? data.map(city => (
                                            <option value={city.id} key={city.id}>
                                                {translate(city.title, locale)}
                                            </option>
                                        )) : null }
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
                            {data ? <Alert initialVisible={true} type={"success"}
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


export default Contacts;