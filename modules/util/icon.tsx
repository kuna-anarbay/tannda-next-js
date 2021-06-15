import {
    IoChevronDown,
    IoChevronForward,
    IoChevronUp,
    IoClose,
    IoLanguageOutline,
    IoSearch,
    IoWarning,
    IoMenu,
    IoPersonSharp,
    IoChevronBack,
    IoReaderOutline,
    IoBook,
    IoSync, IoLockClosed, IoPencil, IoArrowForward, IoCheckbox, IoCheckmark, IoEllipsisHorizontal
} from "react-icons/io5";

export enum IconType {
    ChevronDown,
    LanguageOutline,
    ChevronRight,
    XMark,
    Warning,
    ChevronUp,
    Search,
    Menu,
    User,
    ChevronLeft,
    File,
    Book,
    Sync,
    Lock,
    Pencil,
    ArrowRight,
    Checkmark,
    Ellipsis
}

const icons = (className?: string) => {
    return [
        <IoChevronDown className={className}/>,
        <IoLanguageOutline className={className}/>,
        <IoChevronForward className={className}/>,
        <IoClose className={className}/>,
        <IoWarning className={className} />,
        <IoChevronUp className={className} />,
        <IoSearch className={className} />,
        <IoMenu className={className} />,
        <IoPersonSharp className={className} />,
        <IoChevronBack className={className} />,
        <IoReaderOutline className={className} />,
        <IoBook className={className} />,
        <IoSync className={className} />,
        <IoLockClosed className={className} />,
        <IoPencil className={className} />,
        <IoArrowForward className={className} />,
        <IoCheckmark className={className} />,
        <IoEllipsisHorizontal className={className} />
    ]
}

export const getIcon = (type: IconType, className?: string) => {
    return icons(className)[type];
}
