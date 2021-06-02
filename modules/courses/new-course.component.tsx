import PageHeader from "../util/page-header";
import {Field, Form, Formik} from 'formik';
import CourseService from "../../services/course.service";
import {useState} from "react";
import {useToasts} from "react-toast-notifications";
import {useRouter} from "next/router";
import Button from "../util/button";

interface NewCourseComponentProps {

}

export default function NewCourseComponent(props: NewCourseComponentProps) {
    const courseService = new CourseService();
    const {addToast} = useToasts();
    const [loading, setLoading] = useState(false);
    const {push} = useRouter();

    const handleSubmit = async (values) => {
        console.log(values);
        setLoading(true);
        try {
            await courseService.createCourse({
                title: values.title,
                description: values.description
            });
            setLoading(false);
            await push("/courses");
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
                    title: "Add course"
                }
            ]}/>

            <div className={"px-container"}>
                <Formik initialValues={{}} onSubmit={(values) => handleSubmit(values)}>
                    <Form className={"form"}>
                        <div>
                            <label className={"block text-caption1 text-label-light"}>
                                Course name
                            </label>
                            <Field name={"title"}
                                   placeholder={"Course name"}
                                   className="input-text"/>
                        </div>
                        <div>
                            <label className={"block text-caption1 text-label-light"}>
                                Course description
                            </label>
                            <Field as={"textarea"} name={"description"}
                                   rows={3}
                                   placeholder={"Course description"}
                                   className="textarea"/>
                        </div>
                        <Button title={"Submit"} loading={loading} type={"submit"} className={"btn btn-primary"} />
                    </Form>
                </Formik>
            </div>
        </div>
    );
}
