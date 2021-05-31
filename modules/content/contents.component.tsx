import Content from "./content.entity";
import ContentAction from "./content.action";

export interface ContentComponentProps {
    content: Content;
}

interface ContentsComponentProps {
    courseId: number;
}

export default function ContentsComponent(props: ContentsComponentProps) {
    const {courseId} = props;
    const contentAction = new ContentAction();


    return (
        <div className={"content"}>

        </div>
    )
}
