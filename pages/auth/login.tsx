import React from "react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {Login} from "../../models/Login";
import {AuthAction} from "../../store/actions/auth.action";

export default function LoginPage() {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const login = (e) => {
        e.preventDefault();

        let body = new Login(e.target);
        dispatch(AuthAction.login(body))
    }

    return (
        <div className="tn-height-content">
            <div className="grid grid-cols-12 grid-flow-col tn-height-full">
                <div className="col-span-4">
                    <div className="tn-height-full flex flex-wrap content-center">
                        <div className="tn-padding-horizontal-extra-large tn-width-full">
                            <h1 className="tn-text-large-title tn-font-semibold tn-margin-bottom-regular">
                                {t("auth:login.title")}
                            </h1>
                            <form onSubmit={login}>
                                <div className="space-y-12">
                                    <input required type="tel" name="phone"
                                           className="tn-input"
                                           placeholder={t("form:phone-number")}/>
                                    <input required type="password" name="password"
                                           className="tn-input"
                                           placeholder={t("form:password")}/>
                                    <div className="text-right">
                                        <Link href={"/auth/reset-password"}>
                                            <div className="tn-link tn-text-footnote">
                                                {t("common:button.forgotPassword")}
                                            </div>
                                        </Link>
                                    </div>
                                    <button type="submit" className="tn-button">
                                        {t("common:button.login")}
                                    </button>
                                </div>
                            </form>

                            <div className="space-x-8 tn-text-center tn-margin-top-extra-large tn-text-footnote">
                            <span className={"tn-color-secondary-label"}>
                                {t("auth:login.firstTime")}
                            </span>
                                <Link href={"/auth/setup-account"}>
                                    <span className="tn-link">
                                        {t("common:button.setupAccount")}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-8">
                    <img className="tn-img"
                         src="https://images.pexels.com/photos/4144294/pexels-photo-4144294.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
                </div>
            </div>
        </div>
    )
}