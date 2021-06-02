import {getIcon, IconType} from "./icon";

interface ButtonProps {
    title: string;
    type?: "submit" | "button";
    className?: string;
    loading?: boolean;
}

export default function Button(props: ButtonProps) {
    const {title, loading, className, type} = props;

    return (
        <div className={"flex"}>
            <div className={"flex items-center space-x-2 " + className}>
                {loading ? getIcon(IconType.XMark, "animate-spin text-base") : null}
                <button type={type} disabled={loading}>
                    {title}
                </button>
            </div>
        </div>
    )
}
