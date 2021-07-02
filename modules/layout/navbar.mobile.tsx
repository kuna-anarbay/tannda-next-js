import {GetIcon, IconType} from "../../resources/icon";
import {useAppData} from "../app/app-data-provider";
import Link from "next/link";
import {useRouter} from "next/router";
import {useState} from "react";
import {CSSTransition} from "react-transition-group";
import Avatar from "../util/avatar";
import {images} from "../../resources/images";
import {layoutData} from "./layout.data";

export default function NavbarMobile() {
    const {currentUser} = useAppData();
    const [menu, setMenu] = useState(false);
    const {push} = useRouter();


    return (
        <div className={"h-12 relative md:hidden"}>
            <div
                className="bg-background h-12 fixed top-0 inset-x-0 z-30 border-b border-border shadow-md ">
                <div className={"absolute inset-0 bg-background flex items-center z-40 justify-center py-0.5"}>
                    <img className={"h-full"} src={images.logoSquare} alt={""}/>
                </div>
                <div className={"flex justify-between relative z-40"}>
                    <button onClick={() => setMenu(!menu)} className={"flex items-center px-4 cursor-pointer"}>
                        {GetIcon(IconType.Menu, "text-title2")}
                    </button>
                    <Link href={"/users/me"}>
                        <div
                            className={"h-12 px-4 flex items-center cursor-pointer"}>
                            {currentUser ? (
                                <div className={"flex space-x-2 items-center"}>
                                    <Avatar src={currentUser.avatar} className={"w-8 h-8"}/>
                                    <p>
                                        {currentUser.firstName}
                                    </p>
                                </div>
                            ) : (
                                <div>
                                </div>
                            )}
                        </div>
                    </Link>
                </div>

                <CSSTransition
                    in={menu}
                    timeout={400}
                    classNames="list-transition"
                    unmountOnExit
                    appear
                >
                    <div className={"py-2 space-y-1 border-b border-border bg-background shadow-md"}>
                        {layoutData.navbarItems.map(item => (
                            <Link href={item.path}>
                                <div
                                    className={"flex items-center justify-center relative cursor-pointer py-2 hover:bg-muted"}
                                    key={item.path}>
                                    <p className={"text-subheadline"}>
                                        {item.title}
                                    </p>
                                </div>
                            </Link>
                        ))}
                        {currentUser ? layoutData.loginItems.map(item => (
                            <Link href={item.path}>
                                <div
                                    className={"flex items-center justify-center relative cursor-pointer py-2 hover:bg-muted"}
                                    key={item.path}>
                                    <p className={"text-subheadline"}>
                                        {item.title}
                                    </p>
                                </div>
                            </Link>
                        )) : null}
                    </div>
                </CSSTransition>
            </div>
        </div>
    )
}
