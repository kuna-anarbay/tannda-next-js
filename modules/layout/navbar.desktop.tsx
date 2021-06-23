import r from "../util/r";
import Link from "next/link";
import {useAppData} from "../app/app-data-provider";
import Avatar from "../util/avatar";
import {CSSTransition} from "react-transition-group";
import {useState} from "react";
import AuthService from "../../services/auth.service";
import {useRouter} from "next/router";


export default function NavbarDesktop() {
    const {currentUser, setUser} = useAppData();
    const [dropdown, setDropdown] = useState(false);
    const authService = new AuthService();
    const {push} = useRouter();

    const logOut = async () => {
        setUser(null);
        setDropdown(!dropdown);
        try {
            await authService.logOut();
        } catch (e) {
            console.log(e);
        }
    }

    const showProfile = async () => {
        setDropdown(!dropdown);
        await push("/users/me")
    }

    return (
        <div className={"h-12 relative hidden md:block"}>
            <div
                className="bg-background h-12 fixed top-0 inset-x-0 z-40 flex justify-between border-b border-border">
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
                                <p className={"text-subheadline font-medium"}>
                                    {item.title}
                                </p>
                                <div className={"navbar-item-indicator"}/>
                            </div>
                        </Link>
                    ))}
                    {currentUser ? r.data.loginItems.map(item => (
                        <Link href={item.path}>
                            <div className={"flex items-center justify-center relative h-12 w-30 cursor-pointer"}
                                 key={item.path}>
                                <p className={"text-subheadline font-medium"}>
                                    {item.title}
                                </p>
                                <div className={"navbar-item-indicator"}/>
                            </div>
                        </Link>
                    )) : null}
                </div>
                <div className={"flex pl-5 pr-12 cursor-pointer"}>
                    {currentUser ? (
                        <div className={"relative"}>
                            <div onClick={() => setDropdown(!dropdown)} className={"h-12 flex items-center space-x-2"}>
                                <Avatar src={currentUser.avatar} className={"h-8 w-8"}/>
                                <p className={"text-base font-regular"}>
                                    {currentUser.firstName} {currentUser.lastName}
                                </p>
                            </div>
                            <CSSTransition
                                in={dropdown}
                                timeout={300}
                                classNames="dropdown-animation"
                                unmountOnExit
                                appear
                            >
                                <div className={"absolute bg-background w-full rounded-b-md shadow-md"}>
                                    <div onClick={showProfile}
                                         className={"px-4 py-2 text-footnote hover:text-primary"}>
                                        <Link href={"/users/me"}>
                                            Profile
                                        </Link>
                                    </div>
                                    <div onClick={logOut}
                                         className={"px-4 py-2 text-footnote hover:text-danger"}>
                                        Log out
                                    </div>
                                </div>
                            </CSSTransition>
                        </div>
                    ) : (
                        <div className={"h-12 flex items-center space-x-4"}>
                            <Link href={"/auth/register"}>
                                <button
                                    className={"btn btn-sm bg-primary-extra-light border border-primary-light text-primary"}>
                                    {r.string.register}
                                </button>
                            </Link>
                            <Link href={"/auth/login"}>
                                <button className={"btn btn-primary btn-sm"}>
                                    {r.string.login}
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
