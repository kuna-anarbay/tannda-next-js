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


function useWindowClick(ref, handleClick?: () => void) {
    useEffect(() => {

        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                if (handleClick) handleClick();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
}

