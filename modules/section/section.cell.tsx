import Section from "../../models/section";
import {getIcon, IconType} from "../util/icon";
import {useState} from "react";
import EditSectionDrawer from "./edit-section.drawer";
import {CSSTransition} from "react-transition-group";

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
            className={`text-footnote cursor-pointer hover:text-primary ${isCurrent ? "text-primary font-semibold" : ""}`}>
            <div className={"flex items-center justify-between space-x-1"}>
                <div onClick={() => setCurrentSection(section)} className={"px-4 py-2"}>
                    {index + 1}. {section.title}
                </div>
                <CSSTransition in={editing}
                               timeout={200}
                               classNames="drawer-content"
                               unmountOnExit
                               appear>
                    <div className={"flex items-center space-x-1 pr-4"}>
                        <button
                            className={"p-1.5 border border-border rounded-1.5 hover:bg-background-secondary"}  {...provided.dragHandleProps}>
                            {getIcon(IconType.Menu, "text-base hover:text-primary")}
                        </button>
                        <button onClick={() => setEdit(!edit)}
                                className={"p-1.5 border border-border rounded-1.5 text-orange hover:bg-background-secondary"}>
                            {getIcon(IconType.Ellipsis, "text-base")}
                        </button>
                    </div>
                </CSSTransition>
            </div>

            <EditSectionDrawer courseId={courseId} open={edit} section={section} close={() => setEdit(!edit)}
                               sectionEdited={sectionEdited}
                               sectionAdded={sectionAdded} sectionDeleted={sectionDeleted}/>
        </li>
    )
}
