import {getIcon, IconType} from "../util/icon";
import {ContentComponentProps} from "./contents.component";
import ResourceCell from "../resources/resource.cell";
import {Content} from "../../models/content";


interface ContentCellProps {
    content: Content;
    isLast: boolean;
}

export default function ContentCell(props: ContentCellProps) {
    const {content, isLast} = props;

    return (
        <div className={"space-y-5"}>
            <div className={"space-y-2"}>
                <div className={"space-y-1"}>
                    <h3 className={"font-semibold"}>
                        {content.title}
                    </h3>
                    <p className={"text-footnote text-label-secondary"}>
                        {content.description}
                    </p>
                </div>
                <div className={"space-y-1.5"}>
                    {content.resources.map(resource => (
                        <ResourceCell resource={resource} />
                    ))}
                </div>
            </div>
            {isLast ? null : <hr/>}
        </div>
    )
}
