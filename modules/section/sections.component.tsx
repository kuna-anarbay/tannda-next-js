import Section from "../../models/section";
import {getIcon, IconType} from "../util/icon";
import CreateSectionDrawer from "./create-section.drawer";
import {useState} from "react";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import SectionService from "../../services/section.service";
import {useAppData} from "../app/app-data-provider";
import Spinner from "../util/spinner.component";
import SectionCell from "./section.cell";
import {MemberRole} from "../../models/member";

interface SectionsComponentProps {
    role: MemberRole;
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
    const {
        updateSections,
        sections,
        setCurrentSection,
        courseId,
        syncing,
        currentSection,
        reload,
        loading,
        role
    } = props;
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

    const isNotStudent = () => {
        return role !== MemberRole.STUDENT;
    }

    const sectionAdded = (section: Section) => {
        sections.push(section);
        updateSections(sections);
    }

    const sectionEdited = (section: Section) => {
        const index = sections.findIndex(s => s.id === section.id);
        if (!index) return;
        sections[index].title = section.title;
        updateSections(sections);
    }

    const sectionDeleted = (section: Section) => {
        updateSections(sections.filter(s => s.id !== section.id));
    }

    return (
        <div>
            <div className={"flex justify-between items-center"}>
                <h3 className={"text-base font-medium"}>
                    Модули
                </h3>
                <div className={"flex space-x-2"}>
                    <button onClick={() => reload()} className={"btn btn-sm btn-outline"}>
                        {getIcon(IconType.Sync, syncing ? "animate-spin" : null)}
                    </button>
                    {isNotStudent() ? (
                        <button onClick={() => setEditing(!editing)} className={"btn btn-sm btn-outline"}>
                            {getIcon(IconType.Pencil)}
                        </button>
                    ) : null}
                    {isNotStudent() ? (
                        <button onClick={() => setNewSection(!newSection)} type={"button"}
                                className={"btn btn-sm btn-outline"}>
                            Новый модуль
                        </button>
                    ) : null}
                </div>
            </div>

            <CreateSectionDrawer courseId={courseId} open={newSection}
                                 close={() => setNewSection(!newSection)}
                                 sectionAdded={sectionAdded}
                                 sections={sections}/>
            {loading ? <Spinner/> : null}
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="draggable">
                    {(provided) => (
                        <ul {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={"sections overflow-hidden border border-border list-bordered rounded-lg mt-3"}>
                            {sections.map((section, index) => (
                                <Draggable key={section.id} draggableId={`${section.id}`} index={index}>
                                    {(provided) => (
                                        <SectionCell courseId={courseId} section={section} index={index}
                                                     provided={provided} setCurrentSection={setCurrentSection}
                                                     isCurrent={currentSection === section.id} editing={editing}
                                                     sectionEdited={sectionEdited}
                                                     sectionAdded={sectionAdded}
                                                     sectionDeleted={sectionDeleted}/>
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
