import {useEffect, useRef} from "react";

interface HideableProps {
    children: JSX.Element | JSX.Element[];
    handleClick?: () => void
}

export default function Hideable(props: HideableProps)  {
    const {children, handleClick} = props;
    const wrapperRef = useRef(null);
    useWindowClick(wrapperRef, handleClick);

    return (
        <div ref={wrapperRef}>
            {children}
        </div>
    );
}


const useWindowClick = (ref, handleClick?: () => void) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                if (handleClick) handleClick();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
}

