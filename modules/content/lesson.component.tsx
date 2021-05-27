import {getIcon, IconType} from "../../util/icon";
import {useState} from "react";
import {ContentComponentProps} from "./contents.component";

export default function LessonComponent(props: ContentComponentProps) {
    const {content} = props;
    const [open, setOpen] = useState(false);

    return (
        <div className={"content-item lesson"}>
            <div onClick={() => setOpen(!open)} className={"content-item-header"}>
                <div>
                    <h4 className={"content-item-title lesson"}>
                        {content.title}
                    </h4>
                    <p className={"content-item-meta"}>
                        {content.meta}
                    </p>
                </div>
                <div className={"rounded-full border border-divider-light p-0.5"}>
                    {getIcon(open ? IconType.ChevronUp : IconType.ChevronDown, "text-caption1")}
                </div>
            </div>
            <div className={"content-item-body " + (open ? "" : "hidden")}>
                <p className={"content-item-details"}>
                    {content.description}
                </p>
                <div className={"content-item-resources"}>
                    { content.resources.map(resource => (
                        <div key={resource.title} className={"content-item-resource"}>
                            <div>
                                {getIcon(IconType.Warning, "content-item-resource-icon")}
                            </div>
                            <p className={"content-item-resource-title"}>
                                {resource.title}
                            </p>
                        </div>
                    ))}
                </div>
                <button type={"button"} className={"btn btn-sm btn-primary"}>
                    Some action
                </button>
            </div>
        </div>
    )
}