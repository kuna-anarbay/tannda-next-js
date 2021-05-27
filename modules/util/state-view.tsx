import {getIcon, IconType} from "../../util/icon";

interface StateViewProps {
    title: string;
    icon?: IconType;
    details?: string;
    handleClick?: () => void;
}

export default function StateView(props: StateViewProps) {
    const {icon, handleClick, title, details} = props;

    return (
        <div className={"border border-divider rounded-md p-6 md:p-8 text-center my-4 space-y-3"}>
            <div className={"flex justify-center"}>
                {getIcon(icon, "text-6xl text-label-light")}
            </div>

            <div>
                <h4 className={"text-title3 md:text-title2 font-medium mt-3"}>
                    {title}
                </h4>
                <p className={"text-footnote text-label-light"}>
                    {details}
                </p>
            </div>

            {handleClick ? (
                <button onClick={() => handleClick()} type={"button"} className={"btn btn-sm btn-primary"}>
                    Some action
                </button>
            ) : null}
        </div>
    )
}
