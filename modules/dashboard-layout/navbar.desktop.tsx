import r from "../../util/r";
import {getIcon, IconType} from "../../util/icon";
import {Animated} from "react-animated-css";
import {useState} from "react";

export default function NavbarDesktop() {
    const [showLangMenu, setLangMenu] = useState(false);

    return (
        <div className={"h-12 w-full relative hidden md:block"}>
            <div
                className="bg-background h-12 fixed top-0 left-75 inset-x-0 z-40 flex justify-between border-b border-divider-light px-4">

                <div className={"relative"}>
                    <div onClick={() => setLangMenu(!showLangMenu)}
                         className={"flex items-center space-x-4 px-3 cursor-pointer"}>
                        <div className={"flex space-x-2 items-center h-12"}>
                            <div>
                                <p className={"text-footnote"}>
                                    Aiplus.kz
                                </p>
                                <p className={"text-caption1 text-label-light"}>
                                    проспект Абая, 68
                                </p>
                            </div>
                        </div>
                        <div className={"p-0.5 border rounded-xl border-divider-light text-center"}>
                            {getIcon(IconType.ChevronDown, "text-caption1 text-center")}
                        </div>
                    </div>
                    {/*<Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={200}*/}
                    {/*          animationOutDuration={200} isVisible={showLangMenu}>*/}
                    {/*    /!*{showLangMenu ? (*!/*/}
                    {/*    <div className={"absolute shadow-md rounded-b-md w-30"}>*/}
                    {/*        {r.data.languages.map(lang => (*/}
                    {/*            <div*/}
                    {/*                className={"px-4 py-2 text-footnote cursor-pointer hover:bg-muted hover:text-primary"}>*/}
                    {/*                {lang}*/}
                    {/*            </div>*/}
                    {/*        ))}*/}
                    {/*    </div>*/}
                    {/*    /!*) : null}*!/*/}
                    {/*</Animated>*/}
                </div>


                <div className={"flex space-x-1"}>
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
                        {/*<Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={200}*/}
                        {/*          animationOutDuration={200} isVisible={showLangMenu}>*/}
                        {/*    /!*{showLangMenu ? (*!/*/}
                        {/*    <div className={"absolute shadow-md rounded-b-md w-30"}>*/}
                        {/*        {r.data.languages.map(lang => (*/}
                        {/*            <div*/}
                        {/*                className={"px-4 py-2 text-footnote cursor-pointer hover:bg-muted hover:text-primary"}>*/}
                        {/*                {lang}*/}
                        {/*            </div>*/}
                        {/*        ))}*/}
                        {/*    </div>*/}
                        {/*    /!*) : null}*!/*/}
                        {/*</Animated>*/}
                    </div>
                    <div className={"relative"}>
                        <div onClick={() => setLangMenu(!showLangMenu)}
                             className={"flex items-center space-x-4 px-3 cursor-pointer"}>
                            <div className={"flex items-center space-x-2 h-12"}>
                                <img className={"h-9 w-9 rounded-3xl border border-divider"} src={"https://www.gravatar.com/avatar/7f619db03f032290f6d5874f4d4770d2.jpg?d=https%3A%2F%2Fwolverine.raywenderlich.com%2Fv3-resources%2Fimages%2Fdefault-account-avatar_2x.png&s=480"} />
                                <div>
                                    <p className={"text-footnote"}>
                                        Азат
                                    </p>
                                    <p className={"text-caption1 text-label-light"}>
                                        Администратор
                                    </p>
                                </div>
                            </div>
                            <div className={"p-0.5 border rounded-xl border-divider-light text-center"}>
                                {getIcon(IconType.ChevronDown, "text-caption1 text-center")}
                            </div>
                        </div>
                        {/*<Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={200}*/}
                        {/*          animationOutDuration={200} isVisible={showLangMenu}>*/}
                        {/*    /!*{showLangMenu ? (*!/*/}
                        {/*    <div className={"absolute shadow-md rounded-b-md w-30"}>*/}
                        {/*        {r.data.languages.map(lang => (*/}
                        {/*            <div*/}
                        {/*                className={"px-4 py-2 text-footnote cursor-pointer hover:bg-muted hover:text-primary"}>*/}
                        {/*                {lang}*/}
                        {/*            </div>*/}
                        {/*        ))}*/}
                        {/*    </div>*/}
                        {/*    /!*) : null}*!/*/}
                        {/*</Animated>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}
