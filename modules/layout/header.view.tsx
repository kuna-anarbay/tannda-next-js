import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {images} from "../../resources/images";
import {Route} from "../app/route";
import {strings} from "../../resources/strings";
import {GetIcon, IconType} from "../../resources/icon";
import {layoutData} from "./layout.data";
import {useAppData} from "../app/app-data-provider";


export default function HeaderView() {
    const {currentUser} = useAppData();
    const [top, setTop] = useState(true);
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);


    const scrollHandler = () => {
        window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };


    return (
        <header
            className={`fixed w-full z-30 bg-opacity-90 transition duration-300 ease-in-out ${!top && 'bg-white blur shadow-md'}`}>
            <div className="container mx-auto px-5 sm:px-6">
                <div className="flex items-center justify-between h-14 md:h-14">

                    <div className="flex-shrink-0 mr-4">
                        <Link href="/">
                            <div className="block cursor-pointer" aria-label="Cruip">
                                <img src={images.logoIconText} className={"h-8"}/>
                            </div>
                        </Link>
                    </div>

                    <nav className="flex flex-grow hidden md:block">
                        <ul className="flex flex-grow justify-end flex-wrap items-center">
                            <li>
                                <Link href={Route.auth.login}>
                                    <div
                                        className="btn cursor-pointer text-label-secondary hover:text-gray-900 transition duration-150 ease-in-out">
                                        {strings.login}
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href={Route.auth.register}>
                                    <div
                                        className="btn btn-dark cursor-pointer text-gray-200 ml-3">
                                        {strings.register}
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <nav className="flex flex-grow justify-end block md:hidden">
                        <div onClick={() => setMenu(!menu)}>
                            {GetIcon(IconType.Menu, "text-title3 font-semibold text-label-secondary hover:text-gray-900 cursor-pointer transition duration-150 ease-in-out")}
                        </div>
                    </nav>
                </div>
                {menu && (
                    <div className={"py-1"}>
                        {layoutData.navbarItems.map(item => (
                            <Link href={item.path}>
                                <div key={item.title} className={"py-2 cursor-pointer font-medium text-subheadline"}>
                                    {item.title}
                                </div>
                            </Link>
                        ))}
                        {currentUser && layoutData.loginItems.map(item => (
                            <Link href={item.path}>
                                <div key={item.title} className={"py-2 cursor-pointer font-medium text-subheadline"}>
                                    {item.title}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
}
