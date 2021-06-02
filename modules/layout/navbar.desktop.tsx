import r from "../util/r";
import Link from "next/link";
import {useAppData} from "../app/app-data-provider";
import useTranslation from "next-translate/useTranslation";


export default function NavbarDesktop() {
    const {currentUser} = useAppData();
    const {t} = useTranslation();

    return (
        <div className={"h-12 relative hidden md:block"}>
            <div
                className="bg-background h-12 fixed top-0 inset-x-0 z-40 flex justify-between border-b border-divider-light">
                <div className={"flex items-center"}>
                    <div className={"pl-12 pr-5 py-2 h-12"}>
                        <Link href={"/"}>
                            <img className={"h-full cursor-pointer"} src={r.image.logoIconText.val}
                                 alt={r.image.logoIconText.alt}/>
                        </Link>
                    </div>
                    {r.data.navbarItems.map(item => (
                        <Link href={item.path}>
                            <div className={"flex items-center justify-center relative h-12 w-30 cursor-pointer"}
                                 key={item.path}>
                                <p className={"text-base font-medium"}>
                                    {t(item.title)}
                                </p>
                                <div className={"navbar-item-indicator"}/>
                            </div>
                        </Link>
                    ))}
                    {currentUser ? r.data.loginItems.map(item => (
                        <Link href={item.path}>
                            <div className={"flex items-center justify-center relative h-12 w-30"} key={item.path}>
                                <p className={"text-base font-medium"}>
                                    {t(item.title)}
                                </p>
                                <div className={"navbar-item-indicator"}/>
                            </div>
                        </Link>
                    )) : null}
                </div>
                <div className={"flex"}>
                    {currentUser ? (
                        <div className={"h-12 px-5 flex items-center space-x-4"}>
                            <button
                                className={"btn btn-sm bg-primary-extra-light border border-primary-light text-primary"}>
                                {currentUser.firstName} {currentUser.lastName}
                            </button>
                        </div>
                    ) : (
                        <div className={"h-12 pl-5 pr-12 flex items-center space-x-4"}>
                            <Link href={"/auth/register"}>
                                <button
                                    className={"btn btn-sm bg-primary-extra-light border border-primary-light text-primary"}>
                                    {t(r.string.register)}
                                </button>
                            </Link>
                            <Link href={"/auth/login"}>
                                <button className={"btn btn-primary btn-sm"}>
                                    {t(r.string.login)}
                                </button>
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
