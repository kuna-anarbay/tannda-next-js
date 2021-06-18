import ResourceCell from "../resources/resource.cell";
import {Content} from "../../models/content";
import Link from "next/link";
import {getIcon, IconType} from "../util/icon";

interface ContentCellProps {
    courseId: number;
    content: Content;
    isLast: boolean;
    isEditing: boolean;
    provided: any;
}

export default function ContentCell(props: ContentCellProps) {
    const {courseId, content, isLast, isEditing, provided} = props;

    return (
        <Link href={`/courses/${courseId}/contents/${content.id}`}>
            <div ref={provided.innerRef}
                 {...provided.draggableProps}
                 className={"space-y-5 cursor-pointer hover:text-primary"}>
                <div className={"space-y-2"}>
                    <div className={"space-y-1"}>
                        <div className={"flex items-center space-x-3"}>
                            {isEditing ? (
                                <button
                                    className={"p-1.5 border border-border rounded-1.5 bg-background hover:bg-background-secondary"}  {...provided.dragHandleProps}>
                                    {getIcon(IconType.Menu, "text-base hover:text-primary")}
                                </button>
                            ) : null}
                            <h3 className={"font-semibold text-title3"}>
                                {content.title}
                            </h3>
                        </div>
                        {!isEditing ? (
                            <p className={"text-subheadline text-label"}>
                                {content.description}
                            </p>
                        ) : null}
                    </div>
                    {!isEditing ? (
                        <div className={"space-y-1.5"}>
                            {content.resources.map(resource => (
                                <ResourceCell resource={resource}/>
                            ))}
                        </div>
                    ) : null}
                </div>
                {isLast ? null : <hr/>}
            </div>
        </Link>
    )
}
