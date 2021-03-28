import React from "react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

export default function SetupAccount() {
    const {t} = useTranslation();

    return (
        <div className="bg-secondaryBackground h-fill">
            <div className="flex justify-center">
                <div className="mt-120 bg-white rounded-8 px-40 py-64">
                    <div className="space-y-12">
                        <div className="text-center">
                            <h1 className="text-largeTitle font-semibold">
                                Setup your account
                            </h1>
                            <p className="text-body text-secondaryLabel">
                                We will send verification code to you phone number
                            </p>
                        </div>
                        <input required type="text" name="phone"
                               className="bg-secondaryBackground rounded-8 text-body h-48 w-full focus:ring-primary-500 focus:border-primary-500 border-none"
                               placeholder={t("form:phone-number")}/>
                        <input required type="text" name="code"
                               className="bg-secondaryBackground rounded-8 text-body h-48 w-full focus:ring-primary-500 focus:border-primary-500 border-none"
                               placeholder={t("form:password")}/>
                        <div className="text-right">
                            <Link href={"/auth/reset-password"}>
                            <span className="text-main text-subHeadline cursor-pointer">
                                Resend code
                            </span>
                            </Link>
                        </div>
                        <button className="h-44 px-36 bg-main rounded-8 text-white text-body">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}