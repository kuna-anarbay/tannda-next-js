import Course from "../../models/course";
import {Field, Form, Formik} from "formik";
import Button from "../util/button";
import CourseService from "../../services/course.service";
import {useToasts} from "react-toast-notifications";
import {useState} from "react";

interface EditCourseComponentProps {
    course: Course;
    courseEdited: (Course) => void;
}

export default function EditCourseComponent(props: EditCourseComponentProps) {
    const {course, courseEdited} = props;
    const courseService = new CourseService();
    const {addToast} = useToasts();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const c = await courseService.editCourse(course.id, {
                title: values.title,
                description: values.description
            });
            setLoading(false);
            courseEdited(c);
        } catch (err) {
            setLoading(false);
            addToast(err.message, {appearance: "error", autoDismiss: true});
        }
    }

    return (
        <div>
            <div className={"py-6"}>
                <Formik initialValues={course} onSubmit={(values) => handleSubmit(values)}>
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
                        <Button title={"Сохранить"} loading={loading} type={"submit"} className={"btn btn-primary"}/>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
