import PageHeader from "../util/page-header";
import Category from "../category/category.entity";
import {useDispatch} from "react-redux";
import CourseAction from "./course.action";

interface NewCourseComponentProps {
    categories: Category[];
}

export default function NewCourseComponent(props: NewCourseComponentProps) {
    const {categories} = props;
    const dispatch = useDispatch();
    const courseAction = new CourseAction();

    function handleSubmit(e) {
        e.preventDefault();


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
                <form onSubmit={handleSubmit} className={"form"}>
                    <div>
                        <label className={"block text-caption1 text-label-light"}>
                            Course name
                        </label>
                        <input name={"title"}
                               placeholder={"Course name"}
                               className="input-text"/>
                    </div>
                    <div>
                        <label className={"block text-caption1 text-label-light"}>
                            Course category
                        </label>
                        <select name={"category"} placeholder={"Course category"} className={"select"}>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.title.ru}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className={"block text-caption1 text-label-light"}>
                            Course description
                        </label>
                        <textarea name={"description"}
                                  rows={3}
                                  placeholder={"Course description"}
                                  className="textarea"/>
                    </div>
                    <button type={"submit"} className={"btn btn-primary"}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
