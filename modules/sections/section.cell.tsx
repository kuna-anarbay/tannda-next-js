import Section from "../../models/section";
import {GetIcon, IconType} from "../util/icon";
import {CSSTransition} from "react-transition-group";

interface SectionCellProps {
    section: Section;
    provided: any;
    selectSection: (Section) => void;
    isSelected: boolean;
    editing: boolean;
    editSection: (section: Section) => void;
}

export default function SectionCell(props: SectionCellProps) {
    const {
        section,
        provided,
        selectSection,
        isSelected,
        editing,
        editSection
    } = props;

    return (
        <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`text-footnote cursor-pointer hover:text-primary ${isSelected ? "text-primary bg-background-secondary" : ""}`}>
            <div className={"flex items-center justify-between space-x-1"}>
                <div onClick={() => selectSection(section)} className={"px-4 py-2 flex-grow"}>
                    {section.index + 1}. {section.title}
                </div>
                <CSSTransition in={editing}
                               timeout={200}
                               classNames="drawer-content"
                               unmountOnExit
                               appear>
                    <div className={"flex items-center space-x-1 pr-4"}>
                        <button
                            className={"p-1.5 border border-border rounded-1.5 hover:bg-background-secondary"}  {...provided.dragHandleProps}>
                            {GetIcon(IconType.Menu, "text-base hover:text-primary")}
                        </button>
                        <button onClick={() => editSection(section)}
                                className={"p-1.5 border border-border rounded-1.5 text-orange hover:bg-background-secondary"}>
                            {GetIcon(IconType.Ellipsis, "text-base")}
                        </button>
                    </div>
                </CSSTransition>
            </div>
        </li>
    )
}
