import {ReactNode, useState} from "react";

interface TextProps {
    children: string;
    collapsable?: boolean;
    className?: string;
}

export default function Text(props: TextProps) {
    const {className, children, collapsable} = props;
    const [open, setOpen] = useState(false);

    return (
        <p className={className}>
            {collapsable ? (
                open ? children : children.substr(0, 200)
            ) : children }
            {collapsable ? (
                <a onClick={() => setOpen(!open)} className={"cursor-pointer text-primary"}>
                    { open ? "меньше" : "больше"}
                </a>
            ) : null}
        </p>
    )
}