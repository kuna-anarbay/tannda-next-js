import {Field, Form, Formik} from "formik";
import Button from "../util/button";
import {useState} from "react";
import {CSSTransition} from "react-transition-group";
import {getIcon, IconType} from "../util/icon";
import {useAppData} from "../app/app-data-provider";
import r from "../util/r";
import {Content, ContentType} from "../../models/content";
import ContentService from "../../services/content.service";
import {Resource} from "../../models/resource";
import ResourceCell from "../resources/resource.cell";

interface CreateLessonDrawerProps {
    courseId: number;
    sectionId: number;
    open: boolean;
    close: () => void;
    contentAdded: (Content) => void;
    contents: Content[];
}

export default function CreateLessonDrawer(props: CreateLessonDrawerProps) {
    const {courseId, sectionId, open, close, contents, contentAdded} = props;
    const contentService = new ContentService();
    const {showSuccess, showError} = useAppData();
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const content = await contentService.createContent(courseId, {
                title: values.title,
                description: values.description,
                type: ContentType.LESSON,
                index: parseInt(values.index),
                sectionId: sectionId
            });
            content.resources = await uploadFiles(content.id);
            setFiles([]);
            contentAdded(content);
            setLoading(false);
            showSuccess("Урок добавлен");
            close();
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    }


    const uploadFiles = async (contentId: number) => {
        setLoading(true);
        return contentService.uploadFiles(courseId, contentId, files.map(f => f.file));
    }


    const handleFile = (e) => {
        setFiles([
            ...files,
            {
                url: URL.createObjectURL(e.target.files[0]),
                file: e.target.files[0],
                name: e.target.files[0].name
            }
        ]);
    }


    const removeFile = (index: number) => {
        setFiles(files.filter((f, i) => i !== index));
    }

    const initialValues = () => {
        if (contents.length === 0) return {index: "0"};
        return {index: `${contents[contents.length - 1].index + 1}`};
    }

    return (
        <div>
            <CSSTransition
                in={open}
                timeout={100}
                classNames="drawer-bg"
                unmountOnExit
                appear
            >
                <div onClick={() => close()} className={"bg-label bg-opacity-20 fixed inset-0 z-40"}/>
            </CSSTransition>

            <CSSTransition
                in={open}
                timeout={400}
                classNames="drawer-content"
                unmountOnExit
                appear
            >
                <Formik initialValues={initialValues()} onSubmit={(values) => handleSubmit(values)}>
                    <Form className={"form fixed right-0 top-0 bottom-0 right-0 p-4 w-full md:w-2/5 z-40"}>
                        <div className={"bg-background h-full rounded-1.5 space-y-4"}>
                            <div className={"relative flex items-center justify-center px-4 border-b border-border"}>
                                <div onClick={close}
                                     className={"cursor-pointer absolute right-4 flex items-center justify-center p-1 rounded-full bg-background-secondary"}>
                                    {getIcon(IconType.XMark, "text-primary")}
                                </div>
                                <div className={"py-4"}>
                                    <p className={"text-subheadline"}>
                                        Добавить урок
                                    </p>
                                </div>
                            </div>
                            <div className={"px-4 space-y-6 overflow-y-auto h-drawer-content"}>
                                <div className={"space-y-2.5"}>
                                    <div>
                                        <label>
                                            {r.string.title}
                                        </label>
                                        <Field name={"title"}
                                               placeholder={r.string.title}
                                               type={"text"}/>
                                    </div>
                                    <div>
                                        <label>
                                            {r.string.description}
                                        </label>
                                        <Field as={"textarea"}
                                               name={"description"}
                                               rows={6}
                                               placeholder={r.string.description}
                                               className="textarea"/>
                                    </div>
                                    <div>
                                        <label>
                                            Добавить после
                                        </label>
                                        <Field as={"select"}
                                               name={"index"}
                                               placeholder={r.string.type}
                                               className="select">
                                            <option value={"0"}>
                                                Начало
                                            </option>
                                            {contents.map(content => (
                                                <option key={content.id} value={content.index + 1}>
                                                    {content.index + 1}. {content.title}
                                                </option>
                                            ))}
                                        </Field>
                                    </div>
                                </div>
                                <div>
                                    <div className={"flex justify-between items-center"}>
                                        <label className={"text-footnote"}>
                                            {r.string.resources}
                                        </label>
                                        <label
                                            htmlFor="file"
                                            className="btn btn-outline btn-sm cursor-pointer "
                                        >
                                            <span>Добавить</span>
                                            <Field onChange={handleFile} id={"file"} type="file" name="file"
                                                   className="sr-only"/>
                                        </label>
                                    </div>
                                    <div className={"space-y-2 mt-1"}>
                                        {files.map((file, index) => (
                                            <ResourceCell resource={new Resource(file)}
                                                          remove={() => removeFile(index)}/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={"p-4 rounded-b-1.5 absolute bg-background left-4 right-4 bottom-4 border-t border-border bg-muted"}>
                                <Button type={"submit"} title={"Сохранить"} loading={loading}
                                        className={"btn btn-primary"}/>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </CSSTransition>
        </div>
    );

}
