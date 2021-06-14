import {Field, Form, Formik} from "formik";
import Button from "../util/button";
import {useState} from "react";
import {MemberRole} from "../../models/member";
import {CSSTransition} from "react-transition-group";
import {getIcon, IconType} from "../util/icon";
import {useAppData} from "../app/app-data-provider";
import r from "../util/r";
import {contentTypes} from "../../models/content";
import ContentService from "../../services/content.service";
import Section from "../../models/section";

interface NewSectionComponentProps {
    courseId: number;
    open: boolean;
    close: () => void;
    sectionAdded: (Section) => void;
    sections: Section[];
}

export default function NewSectionComponent(props: NewSectionComponentProps) {
    const {courseId, open, close, sections, contentAdded} = props;
    const [progress, setProgress] = useState(0);
    const contentService = new ContentService();
    const {showSuccess, showError} = useAppData();
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const content = await contentService.createContent(id, {
                title: values.title,
                description: values.description,
                type: values.type,
                prevId: values.prevId
            });
            await uploadFiles(content.id);
            contentAdded();
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
        await contentService.uploadFiles(id, contentId, files.map(f => f.file), (value) => {
            setProgress(value);
        });
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

    return (
        <div>
            <CSSTransition
                in={open}
                timeout={100}
                classNames="drawer-bg"
                unmountOnExit
                appear
            >
                <div onClick={() => close()} className={"bg-black bg-opacity-20 fixed inset-0 z-40"}/>
            </CSSTransition>

            <CSSTransition
                in={open}
                timeout={400}
                classNames="drawer-content"
                unmountOnExit
                appear
            >
                <Formik initialValues={{role: MemberRole.STUDENT}} onSubmit={(values) => handleSubmit(values)}>
                    <Form className={"form fixed right-0 top-0 bottom-0 right-0 p-4 w-full md:w-1/3 z-40"}>
                        <div className={"bg-background h-full rounded-1.5 space-y-4"}>
                            <div className={"relative flex items-center justify-center px-4 border-b border-divider"}>
                                <div onClick={close}
                                     className={"cursor-pointer absolute right-4 flex items-center justify-center p-1 rounded-full bg-primary-extra-light"}>
                                    {getIcon(IconType.XMark, "text-primary")}
                                </div>
                                <div className={"py-4"}>
                                    <p className={"text-subheadline"}>
                                        Добавить урок
                                    </p>
                                </div>
                            </div>
                            <div className={"px-4 space-y-2.5"}>
                                <div>
                                    <label className={"block text-caption1 text-label-light"}>
                                        {r.string.title}
                                    </label>
                                    <Field name={"title"}
                                           placeholder={r.string.title}
                                           className="input-text"/>
                                </div>
                                <div>
                                    <label className={"block text-caption1 text-label-light"}>
                                        {r.string.type}
                                    </label>
                                    <Field as={"select"} name={"type"}
                                           placeholder={r.string.type}
                                           className="select">
                                        {contentTypes.map(type => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <div>
                                    <label className={"block text-caption1 text-label-light"}>
                                        {r.string.description}
                                    </label>
                                    <Field as={"textarea"}
                                           name={"description"}
                                           rows={3}
                                           placeholder={r.string.description}
                                           className="textarea"/>
                                </div>
                                <div>
                                    <label className={"block text-caption1 text-label-light"}>
                                        {r.string.role}
                                    </label>
                                    <Field as={"select"} name={"prevId"}
                                           placeholder={r.string.type}
                                           className="select">
                                        {contents.map(content => (
                                            <option key={content.id} value={content.id}>
                                                {content.title}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <div>
                                    <div className={"flex justify-between items-center"}>
                                        <label className={"block text-caption1 text-label-light"}>
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
                                            <div className={"flex justify-between items-center"}>
                                                <p className={"text-footnote"}>
                                                    {file.name}
                                                </p>
                                                <div onClick={() => removeFile(index)}>
                                                    {getIcon(IconType.XMark, "rounded-full bg-muted p-0.5 text-base cursor-pointer text-label-light")}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={"p-4 rounded-b-1.5 absolute left-4 right-4 bottom-4 border-t border-divider bg-muted"}>
                                {progress > 0 ? (
                                    <div className="relative pt-1 w-full">
                                        <div
                                            className="overflow-hidden w-full h-1.5 mb-4 text-xs flex rounded bg-primary-light">
                                            <div style={{width: `${progress}%`}}
                                                 className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"/>
                                        </div>
                                    </div>
                                ) : null}
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
