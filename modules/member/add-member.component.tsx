import {Field, Form, Formik} from "formik";
import Button from "../util/button";
import {useState} from "react";
import {getRoleName, MemberRole, memberRoles} from "../../models/member";
import {CSSTransition} from "react-transition-group";
import {getIcon, IconType} from "../util/icon";
import {useAppData} from "../app/app-data-provider";
import r from "../util/r";
import MemberService from "../../services/member.service";

interface AddMemberComponentProps {
    id: number;
    open: boolean;
    close: () => void;
}

export default function AddMemberComponent(props: AddMemberComponentProps) {
    const {id, open, close} = props;
    const courseService = new MemberService();
    const {showSuccess, showError} = useAppData();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const message = await courseService.addMember(id, {
                phone: values.phone,
                role: values.role
            });
            setLoading(false);
            showSuccess(message);
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
                <Formik initialValues={{role: MemberRole.STUDENT}} onSubmit={(values) => handleSubmit(values)}>
                    <Form className={"form fixed right-0 top-0 bottom-0 right-0 p-4 w-full md:w-1/3 z-40"}>
                        <div className={"bg-background h-full rounded-1.5 space-y-4"}>
                            <div className={"relative flex items-center justify-center px-4 border-b border-border"}>
                                <div onClick={close}
                                     className={"cursor-pointer absolute right-4 flex items-center justify-center p-1 rounded-full bg-primary-extra-light"}>
                                    {getIcon(IconType.XMark, "text-primary")}
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
                                        {r.string.phoneNumber}
                                    </label>
                                    <Field type={"text"}
                                           name={"phone"}
                                           placeholder={r.string.phoneNumber}/>
                                </div>
                                <div>
                                    <label>
                                        {r.string.role}
                                    </label>
                                    <Field type={"select"}
                                           as={"select"}
                                           name={"role"}
                                           rows={3}
                                           placeholder={r.string.role}>
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
    );

}
