import React from "react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

export default function LoginPage() {
    const {t} = useTranslation();

    return (
        <div className="h-fill">
            <div className="grid grid-cols-12 grid-flow-col h-full w-full">
                <div className="col-span-4">
                    <div className="h-full flex flex-wrap content-center">
                        <div className="px-40 w-full">
                            <h1 className="text-largeTitle font-semibold mb-20">
                                Login to your account
                            </h1>
                            <div className="space-y-12">
                                <input required type="text" name="phone"
                                       className="bg-secondaryBackground rounded-8 text-body h-48 w-full focus:ring-primary-500 focus:border-primary-500 border-none"
                                       placeholder={t("form:phone-number")}/>
                                <input required type="password" name="password"
                                       className="bg-secondaryBackground rounded-8 text-body h-48 w-full focus:ring-primary-500 focus:border-primary-500 border-none"
                                       placeholder={t("form:password")}/>
                                <div className="text-right">
                                    <Link href={"/auth/reset-password"}>
                                    <span className="text-main text-subHeadline cursor-pointer">
                                        Forgot password?
                                    </span>
                                    </Link>
                                </div>
                                <button className="h-44 px-36 bg-main rounded-8 text-white text-body">
                                    Login
                                </button>
                            </div>

                            <div className="space-x-8 text-center mt-40 text-subHeadline text-secondaryLabel">
                            <span>
                                For the first time?
                            </span>
                                <Link href={"/auth/setup-account"}>
                                    <span className="text-main  cursor-pointer">
                                        Setup your account
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-8">
                    <img className="w-full h-full" src="https://images.pexels.com/photos/4144294/pexels-photo-4144294.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                </div>
            </div>
        </div>
    )
}