import ResourceCell from "../resources/resource.cell";
import {Content} from "../../models/content";
import {getIcon, IconType} from "../util/icon";
import {urlify} from "../util/urlify";

interface ContentCellProps {
    showContent: (content: Content) => void;
    content: Content;
    isLast: boolean;
    isEditing: boolean;
    provided: any;
}

export default function ContentCell(props: ContentCellProps) {
    const {showContent, content, isLast, isEditing, provided} = props;

    return (
        <div ref={provided.innerRef}
             {...provided.draggableProps}
             className={"space-y-5"}>
            <div className={"space-y-2"}>
                <div className={"space-y-1"}>
                    <div className={"flex items-center space-x-3 justify-between"}>
                        <h3 onClick={() => showContent(content)}
                            className={"font-semibold flex-grow hover:text-primary text-title3 cursor-pointer"}>
                            {content.title}
                        </h3>
                        {isEditing ? (
                            <button
                                className={"p-1.5 border border-border rounded-1.5 bg-background hover:bg-background-secondary"}  {...provided.dragHandleProps}>
                                {getIcon(IconType.Menu, "text-base hover:text-primary")}
                            </button>
                        ) : null}
                    </div>
                    <a className={"py-0.5 px-1.5 bg-background-secondary rounded-1 text-caption2 uppercase"}>
                        {content.type}
                    </a>
                    {!isEditing ? (
                        <p className={"text-subheadline text-label"}>
                            <div dangerouslySetInnerHTML={{__html: urlify(content.description)}}/>
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
    )
}
