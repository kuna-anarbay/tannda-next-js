import Section from "../../models/section";
import NewAssignmentView from "./new-assignment.view";
import {CreateAssignmentRequestDto} from "./new-assignment.dto";
import {useState} from "react";
import {useAppData} from "../app/app-data-provider";
import NewAssignmentService from "./new-assignment.service";
import {Resource} from "../../models/resource";
import {Content} from "../../models/content";

interface NewAssignmentControllerProps {
    sections: Section[];
    courseId: number;
    open: boolean;
    close: () => void;
    defaultSectionId?: number;
    contentAdded: (content: Content) => void;
}

export default function NewAssignmentController(props: NewAssignmentControllerProps) {
    const {sections, courseId, open, defaultSectionId, close, contentAdded} = props;
    const newLessonService = new NewAssignmentService();
    const {validate, showError} = useAppData();
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState(Array<{ file: File, resource: Resource }>());

    const handleSubmit = async (body: CreateAssignmentRequestDto) => {
        setLoading(true);
        try {
            await validate(body);
            const content = await newLessonService.createAssignment(courseId, body);
            const resources = await newLessonService.uploadFiles(courseId, content.id, files.map(f => f.file));
            setFiles([]);
            contentAdded({
                ...content,
                resources
            });
            setLoading(false);
            close();
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    }


    const handleFile = (e) => {
        const file = e.target.files[0];
        setFiles([...files, {file, resource: new Resource(file)}])
    }

    const removeFile = (index: number) => {
        setFiles(files.filter((file, i) => i !== index));
    }

    return <NewAssignmentView loading={loading}
                              open={open}
                              close={close}
                              sections={sections}
                              defaultSectionId={defaultSectionId}
                              handleFile={handleFile}
                              removeFile={removeFile}
                              files={files.map(f => f.resource)}
                              handleSubmit={handleSubmit}/>
}
