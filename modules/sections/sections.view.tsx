import {GetIcon, IconType} from "../util/icon";
import Section from "../../models/section";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import SectionCell from "./section.cell";

interface SectionsViewProps {
    canEdit: boolean;
    sections: Section[];
    loading: boolean;
    reload: () => void;
    handleOnDragEnd: (result) => void;
    selectSection: (section: Section) => void;
    editSection: (section: Section) => void;
    isSelected: (section: Section) => boolean;
    editing: boolean;
    setEditing: () => void;
    createSection: () => void;
}


export default function SectionsView(props: SectionsViewProps) {
    const {
        editSection,
        createSection,
        sections,
        reload,
        loading,
        canEdit,
        handleOnDragEnd,
        isSelected,
        selectSection,
        editing,
        setEditing
    } = props;

    return (
        <div>
            <div className={"flex justify-between items-center"}>
                <h3 className={"text-base font-medium"}>
                    Модули
                </h3>
                <div className={"flex space-x-2"}>
                    <button onClick={reload} className={"btn btn-sm btn-outline"}>
                        {GetIcon(IconType.Sync, loading ? "animate-spin" : null)}
                    </button>
                    {canEdit ? (
                        <button onClick={setEditing} className={"btn btn-sm btn-outline"}>
                            {GetIcon(IconType.Pencil)}
                        </button>
                    ) : null}
                    {canEdit ? (
                        <button onClick={createSection} type={"button"}
                                className={"btn btn-sm btn-outline"}>
                            Новый модуль
                        </button>
                    ) : null}
                </div>
            </div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="draggable">
                    {(provided) => (
                        <ul {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={"sections overflow-hidden border border-border list-bordered rounded-lg mt-3"}>
                            {sections.map((section, index) => (
                                <Draggable key={section.id} draggableId={`${section.id}`} index={index}>
                                    {(provided) => (
                                        <SectionCell section={section}
                                                     provided={provided}
                                                     selectSection={selectSection}
                                                     isSelected={isSelected(section)}
                                                     editing={editing}
                                                     editSection={editSection}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
