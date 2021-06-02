import PageHeader from "../util/page-header";
import {Field, Form, Formik} from 'formik';

interface NewCourseComponentProps {

}

export default function NewCourseComponent(props: NewCourseComponentProps) {
    const {} = props;

    function handleSubmit(values) {
        console.log(values);

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
                        <button type={"submit"} className={"btn btn-primary"}>
                            Submit
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}
