import {CSSTransition} from "react-transition-group";
import {Field, Form, Formik} from "formik";
import {getRoleName, MemberRole, memberRoles} from "../../models/member.entity";
import {GetIcon, IconType} from "../util/icon";
import {strings} from "../util/strings";
import Button from "../util/button";
import {IMaskInput} from 'react-imask';
import {AddCourseMemberRequestDto} from "./add-course-member.dto";

interface AddCourseMemberViewProps {
    loading: boolean;
    open: boolean;
    close: () => void;
    addMember: (body: AddCourseMemberRequestDto) => void;
}

export default function AddCourseMemberView(props: AddCourseMemberViewProps) {
    const {open, close, addMember, loading} = props;

    const addCourseMemberDefaultValues = {
        phone: "+7",
        role: MemberRole.STUDENT
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
                <Formik initialValues={addCourseMemberDefaultValues} onSubmit={addMember}>
                    <Form className={"form fixed right-0 top-0 bottom-0 right-0 p-4 w-full md:w-1/3 z-40"}>
                        <div className={"bg-background h-full rounded-1.5 space-y-4"}>
                            <div className={"relative flex items-center justify-center px-4 border-b border-border"}>
                                <div onClick={close}
                                     className={"cursor-pointer absolute right-4 flex items-center justify-center p-1 rounded-full bg-primary-extra-light"}>
                                    {GetIcon(IconType.XMark, "text-primary")}
                                </div>
                                <div className={"py-4"}>
                                    <p className={"text-subheadline"}>
                                        Добавить участника
                                    </p>
                                </div>
                            </div>
                            <div className={"px-4 space-y-2.5"}>
                                <div>
                                    <label>
                                        {strings.phoneNumber}
                                    </label>
                                    <Field name={"phone"} render={({field}) => (
                                        <IMaskInput {...field}
                                                    type={"tel"}
                                                    placeholder={strings.phoneNumber}
                                                    mask={"+{7} 000 000 00 00"}/>
                                    )}/>
                                </div>
                                <div>
                                    <label>
                                        {strings.role}
                                    </label>
                                    <Field type={"select"}
                                           as={"select"}
                                           name={"role"}
                                           rows={3}
                                           placeholder={strings.role}>
                                        {memberRoles.map(role => (
                                            <option key={role} value={role}>
                                                {getRoleName(role)}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                            </div>
                            <div
                                className={"p-4 flex rounded-b-1.5 space-x-4 absolute left-4 right-4 bottom-4 border-t border-border bg-muted"}>
                                <Button type={"submit"} title={"Сохранить"} loading={loading}
                                        className={"btn btn-primary"}/>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </CSSTransition>
        </div>
    )
}
