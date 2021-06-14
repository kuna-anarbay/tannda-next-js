import {getIcon, IconType} from "../util/icon";
import {useState} from "react";
import {ContentComponentProps} from "./contents.component";

export default function SectionComponent(props: ContentComponentProps) {
    const {content} = props;
    const [open, setOpen] = useState(false);

    return (
        <div className={"pt-5 pb-2 px-4"}>
            <h3 className={"text-base text-medium"}>
                {content.title}
            </h3>
        </div>
    )
}
