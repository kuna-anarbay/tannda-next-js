import r from "../../util/r";
import {getIcon, IconType} from "../../util/icon";
import {Animated} from "react-animated-css";
import {useState} from "react";

export default function NavbarDesktop() {
    const [showLangMenu, setLangMenu] = useState(false);

    return (
        <div className={"h-12 relative hidden md:block"}>
            <div
                className="bg-background h-12 fixed top-0 inset-x-0 z-40 flex justify-between border-b border-divider-light">
                <div className={"flex items-center"}>
                    <div className={"px-5 py-2 h-12"}>
                        <img className={"h-full"} src={r.image.logoIconText.val} alt={r.image.logoIconText.alt}/>
                    </div>
                    {r.data.navbarItems.map(item => (
                        <div className={"flex items-center justify-center relative h-12 w-30"} key={item}>
                            <p className={"text-base font-medium"}>
                                {item}
                            </p>
                            <div className={"navbar-item-indicator"}/>
                        </div>
                    ))}
                </div>
                <div className={"flex"}>
                    <div className={"relative"}>
                        <div onClick={() => setLangMenu(!showLangMenu)}
                             className={"flex items-center space-x-4 px-3 cursor-pointer"}>
                            <div className={"flex space-x-2 items-center h-12"}>
                                {getIcon(IconType.LanguageOutline, "text-base")}
                                <p className={"text-footnote"}>
                                    English
                                </p>
                            </div>
                            <div className={"p-0.5 border rounded-xl border-divider-light text-center"}>
                                {getIcon(IconType.ChevronDown, "text-caption1 text-center")}
                            </div>
                        </div>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={200}
                                  animationOutDuration={200} isVisible={showLangMenu}>
                            {/*{showLangMenu ? (*/}
                                <div className={"absolute shadow-md rounded-b-md w-30"}>
                                    {r.data.languages.map(lang => (
                                        <div
                                            className={"px-4 py-2 text-footnote cursor-pointer hover:bg-muted hover:text-primary"}>
                                            {lang}
                                        </div>
                                    ))}
                                </div>
                            {/*) : null}*/}
                        </Animated>
                    </div>
                    <div className={"h-12 px-5 text-white bg-primary flex items-center font-medium cursor-pointer hover:bg-primary-selected"}>
                        Become partner
                    </div>
                </div>
            </div>
        </div>
    )
}
