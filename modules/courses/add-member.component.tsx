import PageHeader from "../util/page-header";
import {Field, Form, Formik} from "formik";
import Button from "../util/button";
import CourseService from "../../services/course.service";
import {useToasts} from "react-toast-notifications";
import {useState} from "react";
import {useRouter} from "next/router";
import {MemberRole, memberRoles} from "../../models/member";

interface AddMemberComponentProps {
    id: number;
}

export default function AddMemberComponent(props: AddMemberComponentProps) {
    const {id} = props;
    const courseService = new CourseService();
    const {addToast} = useToasts();
    const [loading, setLoading] = useState(false);
    const {push} = useRouter();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await courseService.addMember(id, {
                phone: values.phone,
                role: values.role,
                note: values.note
            });
            setLoading(false);
            await push(`/courses/${id}`);
        } catch (err) {
            setLoading(false);
            addToast(err.message, {appearance: "error", autoDismiss: true});
        }
    }

    return (
        <div className={"container mx-auto"}>
            <PageHeader title={"Add course"} items={[
                {
                    title: "Courses",
                    path: "/courses"
                },
                {
                    title: "Add member"
                }
            ]}/>

            <div className={"px-container"}>
                <Formik initialValues={{role: MemberRole.STUDENT}} onSubmit={(values) => handleSubmit(values)}>
                    <Form className={"form"}>
                        <div>
                            <label className={"block text-caption1 text-label-light"}>
                                Phone number
                            </label>
                            <Field name={"phone"}
                                   placeholder={"Phone number"}
                                   className="input-text"/>
                        </div>
                        <div>
                            <label className={"block text-caption1 text-label-light"}>
                                Role
                            </label>
                            <Field as={"select"} name={"role"}
                                   rows={3}
                                   placeholder={"Course description"}
                                   className="select">
                                {memberRoles.map(role => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </Field>
                        </div>
                        <div>
                            <label className={"block text-caption1 text-label-light"}>
                                Note
                            </label>
                            <Field as={"textarea"} name={"note"}
                                   rows={2}
                                   placeholder={"Course description"}
                                   className="textarea"/>
                        </div>
                        <Button title={"Submit"} loading={loading} type={"submit"} className={"btn btn-primary"}/>
                    </Form>
                </Formik>
            </div>
        </div>
    );

}