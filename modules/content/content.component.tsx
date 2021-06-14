import {getIcon, IconType} from "../util/icon";
import {ContentComponentProps} from "./contents.component";


export default function ContentComponent(props: ContentComponentProps) {
    const {content, onSelect, selected} = props;

    return (
        <div className={"py-2.5 px-4 space-y-2 bg-background border-b border-divider-light " + (selected ? "bg-muted" : "")}>
            <div onClick={() => onSelect(content)} className={"flex justify-between items-center cursor-pointer"}>
                <div className={"flex space-x-2 items-center"}>
                    {getIcon(IconType.Book, "text-subheadline text-primary")}
                    <h4 className={"text-subheadline " + (selected ? "text-primary" : "text-label-darker")}>
                        {content.title}
                    </h4>
                </div>
                <div className={"rounded-full border border-divider-light p-0.5"}>
                    {getIcon(IconType.ChevronRight, "text-caption1")}
                </div>
            </div>
        </div>
    )
}
