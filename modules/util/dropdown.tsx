import {getIcon, IconType} from "./icon";
import {useState} from "react";
import Hideable from "../../hooks/use.window-click";

interface DropdownProps {
    title: string;
    children: {
        title: string;
        action: (() => void) | (() => Promise<void>);
    }[];
}

export default function Dropdown(props: DropdownProps) {
    const {title, children} = props;
    const [open, setOpen] = useState(false);

    return (
        <div className={"relative"}>
            <Hideable handleClick={() => setOpen(false)}>
                <button onClick={() => setOpen(!open)} type={"button"}
                        className={"btn btn-sm btn-outline flex items-center space-x-1"}>
                    <p>
                        {title}
                    </p>
                    {getIcon(open ? IconType.ChevronUp : IconType.ChevronDown)}
                </button>
                {open ? (
                    <div
                        className={"mt-0.5 absolute list-bordered-light bg-background shadow-md border-border border rounded-1.5 w-full"}>
                        {children.map(child => (
                            <div
                                onClick={child.action}
                                className={"px-4 py-1.5 text-footnote cursor-pointer rounded-t-1.5 hover:bg-background-secondary"}>
                                {child.title}
                            </div>
                        ))}
                    </div>
                ) : null}
            </Hideable>
        </div>
    )
}
