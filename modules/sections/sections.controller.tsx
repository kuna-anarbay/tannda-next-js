import Section from "../../models/section.entity";
import SectionsService from "./sections.service";
import SectionsView from "./sections.view";
import {useState} from "react";
import {useAppData} from "../app/app-data-provider";
import {EditSectionState} from "../edit-section/edit-section.enum";
import EditSectionController from "../edit-section/edit-section.controller";

interface SectionsControllerProps {
    courseId: number;
    selectedSection: Section;
    selectSection: (section: Section) => void;
    loading: boolean;
    reload: () => void;
    canEdit: boolean;
    sections: Section[];
    sectionsUpdated: (sections: Section[]) => void;
}

export default function SectionsController(props: SectionsControllerProps) {
    const {sections, courseId, sectionsUpdated, canEdit, loading, reload, selectedSection, selectSection} = props;
    const sectionsService = new SectionsService();
    const {showError} = useAppData();
    const [editing, setEditing] = useState(false);
    const [editSectionState, setEditSectionState] = useState(EditSectionState.CREATE);
    const [editSectionModal, setEditSectionModal] = useState(false);
    const [editingSection, setEditingSection] = useState(null);

    const handleOnDragEnd = async (result) => {
        if (!result.destination) return;
        if (result.destination.index === result.source.index) return;
        const oldOrder = sections;
        const items = Array.from(sections);
        const section = sections[result.source.index];
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
        sectionsUpdated(items);

        try {
            await sectionsService.reorder(courseId, section.id, {index: result.destination.index});
        } catch (err) {
            showError(err.message);
            sectionsUpdated(oldOrder);
        }
    }

    const isSelected = (section: Section) => {
        return selectedSection && selectedSection.id === section.id;
    }

    const editSection = (section: Section) => {
        setEditingSection(section);
        setEditSectionState(EditSectionState.EDIT);
        setEditSectionModal(true)
    }

    const createSection = () => {
        setEditingSection(null);
        setEditSectionState(EditSectionState.CREATE);
        setEditSectionModal(true);
    }

    const sectionEdited = (section: Section) => {
        const items = Array.from(sections);
        const index = items.findIndex(s => s.id === section.id);
        if (!index) return;
        items[index] = section;
        sectionsUpdated(items);
    }

    const sectionDeleted = (section: Section) => {
        sectionsUpdated(sections.filter(s => s.id !== section.id));
    }

    const sectionAdded = (section: Section) => {
        sectionsUpdated([...sections, section]);
    }

    const closeSectionModal = () => {
        setEditSectionModal(false)
    }

    return (
        <div>
            <SectionsView canEdit={canEdit}
                          sections={sections}
                          loading={loading}
                          reload={reload}
                          handleOnDragEnd={handleOnDragEnd}
                          selectSection={selectSection}
                          editSection={editSection}
                          isSelected={isSelected}
                          editing={editing}
                          setEditing={() => setEditing(!editing)}
                          createSection={createSection}/>
            <EditSectionController state={editSectionState}
                                   courseId={courseId}
                                   open={editSectionModal}
                                   close={closeSectionModal}
                                   sectionEdited={sectionEdited}
                                   sectionDeleted={sectionDeleted}
                                   section={editingSection}
                                   sectionAdded={sectionAdded}/>
        </div>
    )

}
