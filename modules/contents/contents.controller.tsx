import {Content} from "../../models/content";
import {ContentType} from "../enum/content-type.enum";
import ContentsView from "./contents.view";
import ContentsService from "./contents.service";
import {useState} from "react";
import {useAppData} from "../app/app-data-provider";

interface ContentsControllerProps {
    courseId: number;
    contents: Content[];
    canEdit: boolean;
    createContent: (type: ContentType) => void;
    contentsUpdated: (contents: Content[]) => void;
    showContent: (content: Content) => void;
}

export default function ContentsController(props: ContentsControllerProps) {
    const {contents, contentsUpdated, createContent, canEdit, showContent, courseId} = props;
    const contentsService = new ContentsService();
    const {showError} = useAppData();
    const [editing, setEditing] = useState(false);


    const handleOnDragEnd = async (result) => {
        if (!result.destination) return;
        if (result.destination.index === result.source.index) return;
        const oldOrder = contents;
        const items = Array.from(contents);
        const content = contents[result.source.index];
        if (result.source.index > result.destination.index) {
            items[result.source.index].index = result.destination.index;
            for (let i = result.destination.index; i < result.source.index; i++) {
                items[i].index += 1;
            }
        } else {
            items[result.source.index].index = result.destination.index;
            for (let i = result.destination.index; i > result.source.index; i--) {
                items[i].index -= 1;
            }
        }

        contentsUpdated(items);
        try {
            await contentsService.reorder(courseId, content.id, {index: result.destination.index});
        } catch (err) {
            showError(err.message);
            contentsUpdated(oldOrder);
        }
    }

    return <ContentsView contents={contents}
                         canEdit={canEdit}
                         editing={editing}
                         setEditing={() => setEditing(!editing)}
                         handleOnDragEnd={handleOnDragEnd}
                         createContent={createContent}
                         showContent={showContent}/>
}
