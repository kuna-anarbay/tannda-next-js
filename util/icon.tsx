import {IoChevronDown, IoChevronForward, IoClose, IoLanguageOutline} from "react-icons/io5";

export enum IconType {
    ChevronDown,
    LanguageOutline,
    ChevronRight,
    XMark
}

const icons = (className?: string) => {
    return [
        <IoChevronDown className={className}/>,
        <IoLanguageOutline className={className}/>,
        <IoChevronForward className={className}/>,
        <IoClose className={className}/>
    ]
}

export const getIcon = (type: IconType, className?: string) => {
    return icons(className)[type];
}
