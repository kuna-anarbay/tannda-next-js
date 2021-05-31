import NewCourseComponent from "../../modules/courses/new-course.component";
import CategoryAction from "../../modules/category/category.action";

export default function NewCoursePage() {
    const {data: categories} = new CategoryAction().getCategories();

    return <NewCourseComponent categories={categories ?? []}/>
}
