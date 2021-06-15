import Section from "../../models/section";
import {getIcon, IconType} from "../util/icon";
import NewSectionComponent from "./new-section.component";
import {useState} from "react";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import SectionService from "../../services/section.service";
import {useAppData} from "../app/app-data-provider";
import Spinner from "../util/spinner.component";

interface SectionsComponentProps {
    courseId: number;
    currentSection: number;
    syncing: boolean;
    loading: boolean;
    reload: () => void;
    sections: Section[];
    updateSections: (Section) => void;
    setCurrentSection: (Section) => void;
}

export default function SectionsComponent(props: SectionsComponentProps) {
    const {updateSections, sections, setCurrentSection, courseId, syncing, currentSection, reload, loading} = props;
    const [newSection, setNewSection] = useState(false);
    const [editing, setEditing] = useState(false);
    const {showError, showSuccess} = useAppData()
    const sectionSecvice = new SectionService();

    const handleOnDragEnd = async (result) => {
        if (!result.destination) return;
        if (result.destination.index === result.source.index) return;
        const items = Array.from(sections);
        const oldOrder = sections;
        const section = sections[result.source.index];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        updateSections(items);

        try {
            const message = await sectionSecvice.reorder(courseId, section.id, result.destination.index);
            showSuccess(message);
        } catch (err) {
            showError(err.message);
            updateSections(oldOrder);
        }
    }


    const sectionAdded = (section: Section) => {
        sections.push(section);
        updateSections(sections);
    }

    return (
        <div>
            <div className={"flex justify-between items-center"}>
                <h3 className={"text-base font-medium"}>
                    Модули
                </h3>
                <div className={"flex space-x-2"}>
                    <button onClick={() => setEditing(!editing)} className={"btn btn-sm btn-outline"}>
                        {getIcon(IconType.Pencil)}
                    </button>
                    <button onClick={() => reload()} className={"btn btn-sm btn-outline"}>
                        {getIcon(IconType.Sync, syncing ? "animate-spin" : null)}
                    </button>
                    <button onClick={() => setNewSection(!newSection)} type={"button"}
                            className={"btn btn-sm btn-outline"}>
                        Новый модуль
                    </button>
                </div>
            </div>

            <NewSectionComponent courseId={courseId} open={newSection}
                                 close={() => setNewSection(!newSection)}
                                 sectionAdded={sectionAdded}
                                 sections={sections}/>
            {loading ? <Spinner/> : null}
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="draggable">
                    {(provided) => (
                        <ul {...provided.droppableProps}
                            ref={provided.innerRef} className={"sections border border-border rounded-lg mt-3"}>
                            {sections.map((section, index) => (
                                <Draggable key={section.id} draggableId={`${section.id}`} index={index}>
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className={`px-4 py-2 text-footnote cursor-pointer hover:text-primary border-border ${currentSection === section.id ? "text-primary font-semibold" : ""} ${index + 1 === sections.length ? "" : "border-b"}`}>
                                            <div className={"flex items-center space-x-1"}>
                                                <div onClick={() => setCurrentSection(section)} className={"flex-grow"}>
                                                    {index + 1}. {section.title}
                                                </div>
                                                {editing ? (
                                                    <div className={"flex space-x-1"}>
                                                        <button
                                                            className={"btn btn-outline btn-xs"}  {...provided.dragHandleProps}>
                                                            {getIcon(IconType.Menu, "text-base hover:text-primary")}
                                                        </button>
                                                        <button className={"btn btn-outline btn-xs btn-warning"}>
                                                            {getIcon(IconType.Ellipsis, "text-base")}
                                                        </button>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </li>
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
