import Section from "../../models/section.entity";
import NewLessonView from "./new-lesson.view";
import {CreateLessonRequestDto} from "./new-lesson.dto";
import {useState} from "react";
import {useAppData} from "../app/app-data-provider";
import NewLessonService from "./new-lesson.service";
import {Resource} from "../../models/resource.entity";
import {Content} from "../../models/content.entity";

interface NewLessonControllerProps {
    sections: Section[];
    courseId: number;
    open: boolean;
    close: () => void;
    defaultSectionId?: number;
    contentAdded: (content: Content) => void;
}

export default function NewLessonController(props: NewLessonControllerProps) {
    const {sections, courseId, open, defaultSectionId, close, contentAdded} = props;
    const newLessonService = new NewLessonService();
    const {validate, showError} = useAppData();
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState(Array<{ file: File, resource: Resource }>());

    const handleSubmit = async (body: CreateLessonRequestDto) => {
        setLoading(true);
        try {
            await validate(body);
            const content = await newLessonService.createLesson(courseId, body);
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

    return <NewLessonView loading={loading}
                          open={open}
                          close={close}
                          sections={sections}
                          defaultSectionId={defaultSectionId}
                          handleFile={handleFile}
                          removeFile={removeFile}
                          files={files.map(f => f.resource)}
                          handleSubmit={handleSubmit}/>
}
