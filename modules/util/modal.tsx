import {CSSTransition} from "react-transition-group";
import {GetIcon, IconType} from "./icon";

interface ModalProps {
    open: boolean;
    close: () => void;
    title: string;
    children: JSX.Element | JSX.Element[];
}

export default function Modal(props: ModalProps) {
    const {open, title, children, close} = props;

    return (
        <div>
            <CSSTransition
                in={open}
                timeout={100}
                classNames="drawer-bg"
                unmountOnExit
                appear
            >
                <div onClick={close}
                     className={"bg-label bg-opacity-30 px-4 fixed items-start inset-0 z-40 flex justify-center pt-12"}/>
            </CSSTransition>
            <CSSTransition
                in={open}
                timeout={400}
                classNames="modal-content"
                unmountOnExit
                appear
            >
                <div
                    className={"bg-background z-40 top-12 fixed md:left-1/3 rounded-1.5 border border-border w-full md:w-1/3"}>
                    <div
                        className={"relative flex items-center justify-center border-b border-border"}>
                        <div onClick={close}
                             className={"cursor-pointer absolute right-4 flex items-center justify-center p-1 rounded-full bg-background-secondary"}>
                            {GetIcon(IconType.XMark, "text-primary")}
                        </div>
                        <div className={"py-4"}>
                            <p className={"text-subheadline"}>
                                {title}
                            </p>
                        </div>
                    </div>
                    <div className={"p-4"}>
                        {children}
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}
