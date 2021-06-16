import ResourceCell from "../resources/resource.cell";
import {Content} from "../../models/content";
import Link from "next/link";

interface ContentCellProps {
    courseId: number;
    content: Content;
    isLast: boolean;
}

export default function ContentCell(props: ContentCellProps) {
    const {courseId, content, isLast} = props;

    return (
        <Link href={`/courses/${courseId}/contents/${content.id}`}>
            <div className={"space-y-5 cursor-pointer hover:text-primary"}>
                <div className={"space-y-2"}>
                    <div className={"space-y-1"}>
                        <h3 className={"font-semibold text-title3"}>
                            {content.title}
                        </h3>
                        <p className={"text-subheadline text-label"}>
                            {content.description}
                        </p>
                    </div>
                    <div className={"space-y-1.5"}>
                        {content.resources.map(resource => (
                            <ResourceCell resource={resource}/>
                        ))}
                    </div>
                </div>
                {isLast ? null : <hr/>}
            </div>
        </Link>
    )
}
