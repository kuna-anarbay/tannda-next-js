import {EditSectionState} from "./edit-section.enum";
import Section from "../../models/section";
import {CSSTransition} from "react-transition-group";
import {Field, Form, Formik} from "formik";
import {GetIcon, IconType} from "../util/icon";
import {strings} from "../util/strings";
import Button from "../util/button";
import {EditSectionRequestDto} from "./edit-section.dto";

interface EditSectionViewProps {
    open: boolean;
    loading: boolean;
    close: () => void;
    state: EditSectionState;
    section?: Section;
    deleteSection: () => void;
    editSection: (body: EditSectionRequestDto) => void;
}

export default function EditSectionView(props: EditSectionViewProps) {
    const {section, state, close, open, editSection, loading, deleteSection} = props;

    const initialValues = {
        title: section?.title
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
                <Formik initialValues={initialValues} onSubmit={editSection}>
                    <Form className={"form text-label fixed right-0 top-0 bottom-0 right-0 p-4 w-full md:w-1/3 z-40"}>
                        <div className={"bg-background h-full rounded-1.5 space-y-4"}>
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
                                <Button loading={loading}
                                        type={"submit"}
                                        title={"Сохранить"}
                                        className={"btn btn-primary"}/>
                                {state === EditSectionState.EDIT ? (
                                    <Button onClick={deleteSection}
                                            type={"button"}
                                            title={"Удалить"}
                                            className={"btn btn-danger"}/>
                                ) : null}
                            </div>
                        </div>
                    </Form>
                </Formik>
            </CSSTransition>
        </div>
    )

}
