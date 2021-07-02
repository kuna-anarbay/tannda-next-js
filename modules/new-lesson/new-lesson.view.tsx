import Section from "../../models/section.entity";
import {CSSTransition} from "react-transition-group";
import {Field, Form, Formik} from "formik";
import {CreateLessonRequestDto} from "./new-lesson.dto";
import {GetIcon, IconType} from "../../resources/icon";
import {strings} from "../../resources/strings";
import Button from "../util/button";
import ResourceCell from "../resources/resource.cell";
import {Resource} from "../../models/resource.entity";

interface NewLessonViewProps {
    loading: boolean;
    open: boolean;
    close: () => void;
    defaultSectionId?: number;
    sections: Section[];
    handleSubmit: (body: CreateLessonRequestDto) => void;
    handleFile: (e) => void;
    removeFile: (index: number) => void;
    files: Resource[];
}

export default function NewLessonView(props: NewLessonViewProps) {
    const {sections, files, loading, defaultSectionId, open, close, handleSubmit, handleFile, removeFile} = props;

    const initialValues = {
        title: "",
        description: "",
        sectionId: defaultSectionId ?? 0
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
                classNames="modal-content"
                unmountOnExit
                appear
            >
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form className={"form text-label fixed top-0 bottom-0 py-8 w-1/2 left-1/4 z-40"}>
                        <div className={"bg-background h-full rounded-1.5 space-y-4 relative"}>
                            <div className={"relative flex items-center justify-center px-4 border-b border-border"}>
                                <div onClick={close}
                                     className={"cursor-pointer absolute right-4 flex items-center justify-center p-1 rounded-full bg-background-secondary"}>
                                    {GetIcon(IconType.XMark, "text-primary")}
                                </div>
                                <div className={"py-4"}>
                                    <p className={"text-subheadline"}>
                                        Редактировать модуль
                                    </p>
                                </div>
                            </div>
                            <div className={"px-6 space-y-2.5 overflow-auto h-modal-content overscroll-auto"}>
                                <div>
                                    <label>
                                        {strings.title}
                                    </label>
                                    <Field name={"title"}
                                           placeholder={strings.title}
                                           type={"text"}/>
                                </div>
                                <div>
                                    <label>
                                        {strings.description}
                                    </label>
                                    <Field as={"textarea"}
                                           name={"description"}
                                           placeholder={strings.description}/>
                                </div>
                                <div>
                                    <label>
                                        {strings.title}
                                    </label>
                                    <Field as={"select"} name={"sectionId"}>
                                        {sections.map(section => (
                                            <option key={section.id} value={section.id}>
                                                {section.title}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <div>
                                    <div className={"flex justify-between items-center"}>
                                        <label className={"text-footnote"}>
                                            {strings.resources}
                                        </label>
                                        <label
                                            htmlFor="file"
                                            className="btn btn-outline btn-sm cursor-pointer "
                                        >
                                            <span>Добавить</span>
                                            <Field onChange={handleFile} id={"file"} type="file" name="file"
                                                   className="hidden"/>
                                        </label>
                                    </div>
                                    <div className={"space-y-2 mt-1"}>
                                        {files.map((file, index) => (
                                            <ResourceCell resource={file}
                                                          remove={() => removeFile(index)}/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={"p-4 rounded-b-1.5 flex items-center space-x-2 absolute bottom-0 left-0 right-0 w-full border-t border-border bg-muted"}>
                                <Button loading={loading}
                                        type={"submit"}
                                        title={"Сохранить"}
                                        className={"btn btn-primary"}/>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </CSSTransition>
        </div>
    )
}
