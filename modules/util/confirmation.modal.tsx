import {CSSTransition} from "react-transition-group";
import Button from "./button";

interface ConfirmationModalProps {
    open: boolean;
    title: string;
    body?: string;
    handleOk: () => void;
    handleCancel: () => void;
    loading: boolean;
    state?: "primary" | "danger" | "warning";
}

export default function ConfirmationModal(props: ConfirmationModalProps) {
    const {open, title, body, handleCancel, handleOk, loading, state} = props;

    const cancelPressed = () => {
        if (loading) return;

        handleCancel();
    }

    return (
        <div>
            <CSSTransition
                in={open}
                timeout={100}
                classNames="drawer-bg"
                unmountOnExit
                appear
            >
                <div onClick={() => cancelPressed()}
                     className={"bg-label bg-opacity-30 px-4 fixed items-start inset-0 z-40 flex justify-center pt-12"}>
                    <div
                        className={"bg-background rounded-1.5 space-y-6 py-3 px-4 border border-border w-full md:w-1/3"}>
                        <div>
                            <h4 className={"text-title3 font-medium"}>
                                {title}
                            </h4>
                            <p className={"text-subheadline text-label-secondary"}>
                                {body}
                            </p>
                        </div>
                        <div className={"flex items-center space-x-2"}>
                            <Button onClick={handleOk} title={"Confirm"} loading={loading}
                                    className={`btn btn-sm btn-${state ?? "primary"}`}/>
                            <Button onClick={cancelPressed} title={"Cancel"} disabled={loading}
                                    className={"btn btn-sm btn-outline"}/>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}
