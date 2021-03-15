import React from "react";
import {contacts} from "../../public/static/contacts.data";
import useTranslation from "next-translate/useTranslation";
import Alert from "../common/alert.component";
import {connect, useDispatch} from 'react-redux';
import {AuthApi} from "../../services/network/auth.api";
import {RootState} from "../../store/store";
import {GenericState} from "../../generic/generic.state";
import {BecomePartner} from "../../models/BecomePartner";

function Contacts(props: GenericState<BecomePartner>) {

    const {loading, error, response} = props;
    const {t} = useTranslation();
    const dispatch = useDispatch;

    const becomePartner = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData);

        dispatch(AuthApi.instance.becomePartner({
            ...formObject,
            city: {
                id: parseInt(formObject.city as string)
            }
        }))
    }

    return (
        <div className="grid md:grid-flow-col md:grid-cols-3">
            <div className="bg-gray-50 py-8 px-4 md:px-20 md:py-16 md:col-span-1">
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
                            {contacts.map(contact => (
                                <li className="px-3 py-1.5 my-0.5 text-gray-600 space-x-2.5 rounded-md hover:bg-blue-50 hover:text-main">
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
            <div className="bg-white py-8 px-4 md:px-20 md:py-16 md:col-span-2">
                <form onSubmit={becomePartner} id="become-partner">
                    <h3 className="text-xl font-medium md:text-2xl">
                        {t("landing:become-partner.title")}
                    </h3>
                    <p className="text-gray-500">
                        {t("landing:become-partner.subtitle")}
                    </p>
                    <div className="mt-4">
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 field-required">
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
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 field-required">
                                {t("form:city")}
                            </label>
                            <div className="mt-1 rounded-md">
                                <select
                                    required
                                    name="city"
                                    placeholder={t("form:city")}
                                    className="w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-primary-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    <option value="almaty">
                                        Almaty
                                    </option>
                                    <option value="astana">
                                        Astana
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 field-required">
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
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 field-required">
                                {t("form:phone-number")}
                            </label>
                            <div className="mt-1 rounded-md">
                                <input required type="text" name="phoneNumber" id="price"
                                       className="focus:ring-primary-500 focus:border-primary-500 w-full sm:text-sm border-gray-300 rounded-md"
                                       placeholder={t("form:phone-number")}/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 field-required">
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
                        {error ? <Alert initialVisible={true} type={"error"} text={error.message}/> : null}
                        {response ? <Alert initialVisible={true} type={"success"}
                                           text={t("landing:become-partner.success")}/> : null}
                        <button disabled={loading} type="submit"
                                className="bg-main flex space-x-2.5 text-white px-6 py-2 rounded-lg md:px-8 hover:bg-primary-900">
                            {loading ? <i className="animate-spin fas fa-spinner"/> : null} {t("common:button.submit")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = (state: RootState) => {
    return state.auth.becomePartner;
}

export default connect(mapStateToProps)(Contacts);