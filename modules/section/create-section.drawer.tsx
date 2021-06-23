import {Field, Form, Formik} from "formik";
import Button from "../util/button";
import {useState} from "react";
import {CSSTransition} from "react-transition-group";
import {getIcon, IconType} from "../util/icon";
import {useAppData} from "../app/app-data-provider";
import r from "../util/r";
import Section from "../../models/section";
import SectionService from "../../services/section.service";

interface CreateSectionDrawerProps {
    courseId: number;
    open: boolean;
    close: () => void;
    sectionAdded: (Section) => void;
    sections: Section[];
}

export default function CreateSectionDrawer(props: CreateSectionDrawerProps) {
    const {courseId, open, close, sections, sectionAdded} = props;
    const sectionService = new SectionService();
    const {showSuccess, showError} = useAppData();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const result = await sectionService.createSection(courseId, {
                title: values.title,
                index: parseInt(values.index)
            });
            sectionAdded(result);
            setLoading(false);
            showSuccess("Модуль добавлен");
            close();
        } catch (err) {
            setLoading(false);
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
                <Formik initialValues={{index: "0"}} onSubmit={(values) => handleSubmit(values)}>
                    <Form className={"form fixed right-0 top-0 bottom-0 right-0 p-4 w-full md:w-1/3 z-40"}>
                        <div className={"bg-background h-full rounded-1.5 space-y-4"}>
                            <div className={"relative flex items-center justify-center px-4 border-b border-border"}>
                                <div onClick={close}
                                     className={"cursor-pointer absolute right-4 flex items-center justify-center p-1 rounded-full bg-background-secondary"}>
                                    {getIcon(IconType.XMark, "text-primary")}
                                </div>
                                <div className={"py-4"}>
                                    <p className={"text-subheadline"}>
                                        Добавить модуль
                                    </p>
                                </div>
                            </div>
                            <div className={"px-4 space-y-2.5"}>
                                <div>
                                    <label>
                                        {r.string.title}
                                    </label>
                                    <Field name={"title"}
                                           placeholder={r.string.title}
                                           type={"text"} />
                                </div>
                                <div>
                                    <label>
                                        {r.string.role}
                                    </label>
                                    <Field as={"select"}
                                           name={"index"}
                                           placeholder={r.string.type}
                                           className="select">
                                        <option value={"0"}>
                                            Начало
                                        </option>
                                        {sections.map(section => (
                                            <option key={section.id} value={`${section.index + 1}`}>
                                                {section.title}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                            </div>
                            <div
                                className={"p-4 rounded-b-1.5 absolute left-4 right-4 bottom-4 border-t border-border bg-muted"}>
                                <Button type={"submit"} title={"Добавить"} loading={loading}
                                        className={"btn btn-primary"}/>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </CSSTransition>
        </div>
    );

}
