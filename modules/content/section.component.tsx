import {getIcon, IconType} from "../util/icon";
import {useState} from "react";
import {ContentComponentProps} from "./contents.component";

export default function SectionComponent(props: ContentComponentProps) {
    const {content} = props;
    const [open, setOpen] = useState(false);

    return (
        <div className={"content-item"}>
            <div onClick={() => setOpen(!open)} className={"content-item-header"}>
                <div>
                    <h4 className={"content-item-title section"}>
                        Section title
                    </h4>
                    <p className={"content-item-meta"}>
                        3 lessons
                    </p>
                </div>
                <div className={"rounded-full border border-divider-light p-0.5"}>
                    {getIcon(open ? IconType.ChevronUp : IconType.ChevronDown, "text-caption1")}
                </div>
            </div>
            <div className={"content-item-body " + (open ? "" : "hidden")}>
                <p className={"content-item-details"}>
                    If you want to add an additional small breakpoint, you can’t use extend because the small breakpoint
                    would be added to the end of the breakpoint list.
                    If you want to add an additional small breakpoint, you can’t use extend because the small breakpoint
                    would be added to the end of the breakpoint list.
                </p>
                <div className={"content-item-resources"}>
                    <div className={"content-item-resource"}>
                        <div>
                            {getIcon(IconType.Warning, "content-item-resource-icon")}
                        </div>
                        <p className={"content-item-resource-title"}>
                            Some pdr material.pdf
                        </p>
                    </div>
                    <div className={"content-item-resource"}>
                        <div>
                            {getIcon(IconType.Warning, "content-item-resource-icon")}
                        </div>
                        <p className={"content-item-resource-title"}>
                            Some pdr material.pdf
                        </p>
                    </div>
                    <div className={"content-item-resource"}>
                        <div>
                            {getIcon(IconType.Warning, "content-item-resource-icon")}
                        </div>
                        <p className={"content-item-resource-title"}>
                            Some pdr material.pdf
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}