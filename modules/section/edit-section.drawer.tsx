import {Field, Form, Formik} from "formik";
import Button from "../util/button";
import {CSSTransition} from "react-transition-group";
import {getIcon, IconType} from "../util/icon";
import {useAppData} from "../app/app-data-provider";
import Section from "../../models/section";
import SectionService from "../../services/section.service";
import {strings} from "../util/strings";

interface EditSectionDrawerProps {
    courseId: number;
    open: boolean;
    section: Section;
    close: () => void;
    sectionEdited: (Section) => void;
    sectionAdded: (Section) => void;
    sectionDeleted: (Section) => void;
}

export default function EditSectionDrawer(props: EditSectionDrawerProps) {
    const {courseId, open, close, sectionEdited, section, sectionAdded, sectionDeleted} = props;
    const sectionService = new SectionService();
    const {showSuccess, showError} = useAppData();

    const handleSubmit = async (values) => {
        sectionEdited({
            ...section,
            title: values.title
        });
        close();
        try {
            await sectionService.updateSection(courseId, section.id, {
                title: values.title,
                index: section.index
            });
            showSuccess("Модуль обновлен");
        } catch (err) {
            sectionEdited(section);
            showError(err.message);
        }
    }


    const handleDelete = async () => {
        sectionDeleted(section);
        try {
            const message = await sectionService.deleteSection(courseId, section.id);
            showSuccess(message);
        } catch (err) {
            sectionAdded(section);
            showError(err.message);
        }
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
                <Formik initialValues={section} onSubmit={(values) => handleSubmit(values)}>
                    <Form className={"form text-label fixed right-0 top-0 bottom-0 right-0 p-4 w-full md:w-1/3 z-40"}>
                        <div className={"bg-background h-full rounded-1.5 space-y-4"}>
                            <div className={"relative flex items-center justify-center px-4 border-b border-border"}>
                                <div onClick={close}
                                     className={"cursor-pointer absolute right-4 flex items-center justify-center p-1 rounded-full bg-background-secondary"}>
                                    {getIcon(IconType.XMark, "text-primary")}
                                </div>
                                <div className={"py-4"}>
                                    <p className={"text-subheadline"}>
                                        Редактировать модуль
                                    </p>
                                </div>
                            </div>
                            <div className={"px-4 space-y-2.5"}>
                                <div>
                                    <label>
                                        {strings.title}
                                    </label>
                                    <Field name={"title"}
                                           placeholder={strings.title}
                                           type={"text"}/>
                                </div>
                            </div>
                            <div
                                className={"p-4 rounded-b-1.5 flex items-center space-x-2 absolute left-4 right-4 bottom-4 border-t border-border bg-muted"}>
                                <Button type={"submit"} title={"Сохранить"}
                                        className={"btn btn-primary"}/>
                                <Button onClick={handleDelete} type={"button"} title={"Удалить"}
                                        className={"btn btn-danger"}/>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </CSSTransition>
        </div>
    );

}
