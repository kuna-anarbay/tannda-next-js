import {
    IoChevronDown,
    IoChevronForward,
    IoChevronUp,
    IoClose,
    IoLanguageOutline,
    IoSearch,
    IoWarning
} from "react-icons/io5";

export enum IconType {
    ChevronDown,
    LanguageOutline,
    ChevronRight,
    XMark,
    Warning,
    ChevronUp,
    Search
}

const icons = (className?: string) => {
    return [
        <IoChevronDown className={className}/>,
        <IoLanguageOutline className={className}/>,
        <IoChevronForward className={className}/>,
        <IoClose className={className}/>,
        <IoWarning className={className} />,
        <IoChevronUp className={className} />,
        <IoSearch className={className} />
    ]
}

export const getIcon = (type: IconType, className?: string) => {
    return icons(className)[type];
}
