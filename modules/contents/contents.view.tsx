import {Content} from "../../models/content.entity";
import {ContentType} from "../enum/content-type.enum";
import {GetIcon, IconType} from "../util/icon";
import ContentCell from "./content.cell";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import Dropdown from "../util/dropdown";
import {strings} from "../util/strings";

interface ContentsViewProps {
    contents: Content[];
    canEdit: boolean;
    editing: boolean;
    setEditing: () => void;
    handleOnDragEnd: (result) => void;
    createContent: (type: ContentType) => void;
    showContent: (content: Content) => void;
}

export default function ContentsView(props: ContentsViewProps) {
    const {handleOnDragEnd, contents, createContent, canEdit, editing, showContent, setEditing} = props;

    return (
        <div>
            <div className={"flex justify-between items-center"}>
                <h3 className={"text-base font-medium"}>
                    {strings.lessons}
                </h3>
                {canEdit ? (
                    <div className={"flex space-x-2"}>
                        <button onClick={setEditing} className={"btn btn-sm btn-outline"}>
                            {GetIcon(IconType.Pencil)}
                        </button>
                        <Dropdown title={strings.addLesson} children={[
                            {
                                title: strings.lesson,
                                action: () => createContent(ContentType.LESSON)
                            },
                            {
                                title: strings.assignment,
                                action: () => createContent(ContentType.ASSIGNMENT)
                            },
                            {
                                title: strings.exam,
                                action: () => createContent(ContentType.EXAM)
                            }
                        ]}/>
                    </div>
                ) : null}
            </div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="draggable">
                    {(provided) => (
                        <div {...provided.droppableProps}
                             ref={provided.innerRef} className={"mt-3 space-y-5"}>
                            {contents.map((content, index) => (
                                <Draggable key={content.id} draggableId={`${content.id}`} index={index}>
                                    {(provided) => (
                                        <ContentCell provided={provided} isEditing={editing}
                                                     showContent={showContent} content={content}
                                                     isLast={index + 1 === contents.length}/>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
