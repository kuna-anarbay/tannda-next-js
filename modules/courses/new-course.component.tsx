import PageHeader from "../util/page-header";
import Category from "../category/category.entity";
import CourseAction from "./course.action";
import {Field, Form, Formik} from 'formik';

interface NewCourseComponentProps {
    categories: Category[];
}

export default function NewCourseComponent(props: NewCourseComponentProps) {
    const {categories} = props;
    const courseAction = new CourseAction();
    const {data, isLoading, mutate} = courseAction.createCourse();

    function handleSubmit(values) {
        console.log(values);
        mutate({
            title: values.title,
            description: values.description,
            categoryId: values.categoryId
        })
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
                <Formik initialValues={{
                    categoryId: categories.length > 0 ? categories[0].id : null
                }} onSubmit={(values) => handleSubmit(values)}>
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
                                Course category
                            </label>
                            <Field as={"select"} name={"categoryId"} placeholder={"Course category"}
                                   className={"select"}>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.title.ru}
                                    </option>
                                ))}
                            </Field>
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
