import Section from "../../models/section";
import {getIcon, IconType} from "../util/icon";
import {useState} from "react";
import EditSectionDrawer from "./edit-section.drawer";

interface SectionCellProps {
    courseId: number;
    section: Section;
    index: number;
    provided: any;
    setCurrentSection: (Section) => void;
    isCurrent: boolean;
    editing: boolean;
    sectionEdited: (section: Section) => void;
    sectionAdded: (Section) => void;
    sectionDeleted: (Section) => void;
}

export default function SectionCell(props: SectionCellProps) {
    const {
        courseId,
        index,
        section,
        provided,
        setCurrentSection,
        isCurrent,
        editing,
        sectionEdited,
        sectionAdded,
        sectionDeleted
    } = props;
    const [edit, setEdit] = useState(false);

    return (
        <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            onClick={() => setCurrentSection(section)}
            className={`px-4 py-2 text-footnote cursor-pointer hover:text-primary ${isCurrent ? "text-primary font-semibold" : ""}`}>
            <div className={"flex items-center space-x-1"}>
                <div className={"flex-grow"}>
                    {index + 1}. {section.title}
                </div>
                {editing ? (
                    <div className={"flex space-x-1"}>
                        <button
                            className={"btn btn-outline btn-xs"}  {...provided.dragHandleProps}>
                            {getIcon(IconType.Menu, "text-base hover:text-primary")}
                        </button>
                        <button onClick={() => setEdit(!edit)} className={"btn btn-outline btn-xs btn-warning"}>
                            {getIcon(IconType.Ellipsis, "text-base")}
                        </button>
                    </div>
                ) : null}
            </div>

            <EditSectionDrawer courseId={courseId} open={edit} section={section} close={() => setEdit(!edit)}
                               sectionEdited={sectionEdited}
                               sectionAdded={sectionAdded} sectionDeleted={sectionDeleted}/>
        </li>
    )
}