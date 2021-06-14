import {getIcon, IconType} from "./icon";
import Spinner from "./spinner.component";

interface ButtonProps {
    title: string;
    type?: "submit" | "button";
    className?: string;
    loading?: boolean;
    onClick?: (e) => void;
}

export default function Button(props: ButtonProps) {
    const {title, loading, className, type, onClick} = props;

    return (
        <button onClick={onClick} type={type ?? "button"} disabled={loading} className={"flex items-center space-x-2 " + className}>
            {loading ? <Spinner size={"small"} /> : null}
            <span>
                    {title}
                </span>
        </button>
    )
}
