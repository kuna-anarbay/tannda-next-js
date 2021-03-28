import React, {useEffect} from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import {useDispatch} from 'react-redux';
import {CityAction} from "../../store/actions/city.action";
import {City} from "../../models/City";
import LocalDatabase from "../../services/localDatabase";
import LangChanger from "./lang-changer";

function NavigationComponent() {

    // Properties
    const dispatch = useDispatch();
    const {t} = useTranslation();

    // ComponentDidMount
    useEffect(() => {
        dispatch(CityAction.getCities()).then(({data}) => {
            LocalDatabase.instance.setCities(data as Array<City>);
        });
    }, []);


    return (
        <div style={{height: "64px"}}>
            <nav className="bg-white top-0 w-full fixed shadow-sm">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <LangChanger/>
                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href={"/"}>
                                    <img className="block lg:hidden h-8 w-auto"
                                         src="https://tannda-storage.s3.eu-central-1.amazonaws.com/tannda/web/logo-without-container.svg"
                                         alt="Tañda"/>
                                </Link>
                                <Link href={"/"}>
                                    <img className="hidden lg:block h-8 w-auto"
                                         src="https://tannda-storage.s3.eu-central-1.amazonaws.com/tannda/web/logo-with-text.svg"
                                         alt="Tañda"/>
                                </Link>
                            </div>
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    <LangChanger/>
                                </div>
                            </div>
                        </div>
                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="ml-3 relative">
                                <div>
                                    <Link href="/#become-partner">
                                        <button
                                            className="bg-blue-50 text-main text-sm font-medium px-3 py-2 rounded-md hover:bg-blue-100">
                                            {t("common:button.becomePartner")}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavigationComponent;
