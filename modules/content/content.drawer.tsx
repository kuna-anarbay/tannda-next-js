import {CSSTransition} from "react-transition-group";
import {getIcon, IconType} from "../util/icon";
import {ContentComponentProps} from "./contents.component";
import Button from "../util/button";


export default function ContentDrawer(props: ContentComponentProps) {
    const {content, onSelect, selected, open, close} = props;

    return (
        <div>
            <CSSTransition
                in={open}
                timeout={100}
                classNames="drawer-bg"
                unmountOnExit
                appear
            >
                <div onClick={() => close()} className={"bg-black bg-opacity-20 fixed inset-0 z-40"}/>
            </CSSTransition>

            <CSSTransition
                in={open}
                timeout={400}
                classNames="drawer-content"
                unmountOnExit
                appear
            >
                <div
                    className={"p-4 fixed right-0 top-0 bottom-0 right-0 p-4 w-full md:w-2/5 z-40"}>
                    {content ? (
                        <div className={"bg-background rounded-1.5 border border-divider h-full"}>
                            <div className={"relative flex items-center justify-center px-4 border-b border-divider"}>
                                <div onClick={close}
                                     className={"cursor-pointer absolute right-4 flex items-center justify-center p-1 rounded-full bg-primary-extra-light"}>
                                    {getIcon(IconType.XMark, "text-primary")}
                                </div>
                                <div className={"py-4"}>
                                    <p className={"text-subheadline"}>
                                        Детали урока
                                    </p>
                                </div>
                            </div>
                            <div className={" p-4"}>
                                <div className={"space-y-2"}>
                                    <h3 className={"text-base font-medium"}>
                                        {content.title}
                                    </h3>
                                    <p className={"text-footnote text-label-light"}>
                                        {content.description}
                                    </p>
                                </div>
                                <div className={"mt-4 space-y-1"}>
                                    <h4 className={"text-subheadline text-label-head"}>
                                        Материалы
                                    </h4>
                                    <div className={"space-y-1"}>
                                        {content.resources.map(resource => (
                                            <div className={"flex space-x-2 items-center"}>
                                                {getIcon(IconType.File, "text-footnote text-label-head")}
                                                <a href={resource.url} target={"_blank"}
                                                   className={"text-footnote text-primary"}>
                                                    {resource.originalName}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={"p-4 rounded-b-1.5 absolute left-4 right-4 bottom-4 border-t border-divider bg-muted"}>
                                <Button type={"submit"} title={"Сохранить"}
                                        className={"btn btn-primary"}/>
                            </div>
                        </div>
                    ) : null}
                </div>
            </CSSTransition>
        </div>
    );

}
