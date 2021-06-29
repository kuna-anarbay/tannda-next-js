import Section from "../../models/section.entity";
import {EditSectionState} from "./edit-section.enum";
import EditSectionView from "./edit-section.view";
import {EditSectionRequestDto} from "./edit-section.dto";
import {useAppData} from "../app/app-data-provider";
import EditSectionService from "./edit-section.service";
import {useState} from "react";

interface EditSectionControllerProps {
    state: EditSectionState;
    courseId: number;
    section?: Section;
    open: boolean;
    close: () => void;
    sectionEdited: (section: Section) => void;
    sectionDeleted: (section: Section) => void;
    sectionAdded: (section: Section) => void;
}

export default function EditSectionController(props: EditSectionControllerProps) {
    const {section, courseId, close, open, state, sectionAdded, sectionDeleted, sectionEdited} = props;
    const editSectionService = new EditSectionService();
    const {showError, validate} = useAppData();
    const [loading, setLoading] = useState(false);


    const deleteSection = async () => {
        close();
        sectionDeleted(section);
        try {
            await editSectionService.deleteSection(courseId, section.id);
        } catch (err) {
            sectionAdded(section);
            showError(err);
        }
    }

    const createSection = async (body: EditSectionRequestDto) => {
        return editSectionService.createSection(courseId, body);
    }

    const editSection = async (body: EditSectionRequestDto) => {
        await editSectionService.updateSection(courseId, section.id, body);
    }

    const handleSubmit = async (body: EditSectionRequestDto) => {
        try {
            await validate(body);
            if (state === EditSectionState.EDIT) {
                close();
                sectionEdited({
                    ...section,
                    title: body.title
                });
                await editSection(body);
            } else {
                setLoading(true);
                const section = await createSection(body);
                sectionAdded(section);
                close();
                setLoading(false);
            }
        } catch (err) {
            if (state === EditSectionState.EDIT) {
                sectionEdited(section);
            } else {
                setLoading(false);
            }
            showError(err);
        }
    }


    return <EditSectionView loading={loading}
                            open={open}
                            close={close}
                            state={state}
                            section={section}
                            deleteSection={deleteSection}
                            editSection={handleSubmit}/>
}
