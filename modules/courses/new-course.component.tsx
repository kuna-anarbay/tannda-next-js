import {Field, Form, Formik} from 'formik';
import CourseService from "../../services/course.service";
import {useState} from "react";
import {useToasts} from "react-toast-notifications";
import {useRouter} from "next/router";
import Button from "../util/button";


export default function NewCourseComponent() {
    const courseService = new CourseService();
    const {addToast} = useToasts();
    const [loading, setLoading] = useState(false);
    const {push} = useRouter();

    const handleSubmit = async (values) => {
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
        <div className={"container mx-auto px-4 md:px-0"}>
            <Formik initialValues={{}} onSubmit={(values) => handleSubmit(values)}>
                <Form className={"space-y-3 md:w-5/12"}>
                    <div>
                        <label>
                            Название курса
                        </label>
                        <Field type={"text"}
                               name={"title"}
                               placeholder={"Название курса"}/>
                    </div>
                    <div>
                        <label>
                            Описание курса
                        </label>
                        <Field as={"textarea"}
                               type={"text"}
                               name={"description"}
                               rows={6}
                               placeholder={"Описание курса"}
                               className={"textarea"}
                        />
                    </div>
                    <Button title={"Добавить"} loading={loading} type={"submit"} className={"btn btn-primary"}/>
                </Form>
            </Formik>
        </div>
    );
}
