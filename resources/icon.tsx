import {
    IoArrowForward,
    IoCheckmark,
    IoChevronDown,
    IoChevronForward,
    IoChevronUp,
    IoClose,
    IoCloudUpload,
    IoEllipsisHorizontal,
    IoLockClosed,
    IoMenu,
    IoPencil,
    IoPersonSharp,
    IoReaderOutline,
    IoSync
} from "react-icons/io5";

export enum IconType {
    ChevronDown,
    ChevronRight,
    XMark,
    ChevronUp,
    Menu,
    User,
    File,
    Sync,
    Lock,
    Pencil,
    Checkmark,
    Ellipsis,
    Upload,
    ArrowRight
}

const Icons = (className?: string) => {
    return [
        <IoChevronDown className={className}/>,
        <IoChevronForward className={className}/>,
        <IoClose className={className}/>,
        <IoChevronUp className={className}/>,
        <IoMenu className={className}/>,
        <IoPersonSharp className={className}/>,
        <IoReaderOutline className={className}/>,
        <IoSync className={className}/>,
        <IoLockClosed className={className}/>,
        <IoPencil className={className}/>,
        <IoCheckmark className={className}/>,
        <IoEllipsisHorizontal className={className}/>,
        <IoCloudUpload className={className}/>,
        <IoArrowForward className={className}/>
    ]
}

export const GetIcon = (type: IconType, className?: string) => {
    return Icons(className)[type];
}

