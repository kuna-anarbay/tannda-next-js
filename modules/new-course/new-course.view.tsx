import {NewCourseRequestDto} from "./new-course.dto";
import {Field, Form, Formik} from "formik";
import Button from "../util/button";
import PageHeader from "../util/page-header";
import {Route} from "../app/route";

interface NewCourseViewProps {
    loading: boolean;
    createCourse: (body: NewCourseRequestDto) => void;
}

export default function NewCourseView(props: NewCourseViewProps) {
    const {loading, createCourse} = props;

    const newCourseDefaultValues = {
        title: "",
        description: ""
    };

    return (
        <div className={"container mx-auto px-4 md:px-0"}>
            <PageHeader title={"Новый курс"} items={[
                {
                    title: "Курсы",
                    path: Route.courses.my
                },
                {
                    title: "Новый курс"
                }
            ]}/>
            <Formik initialValues={newCourseDefaultValues} onSubmit={createCourse}>
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
    )
}
