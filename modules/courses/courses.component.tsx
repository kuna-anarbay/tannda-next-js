import {useRouter} from "next/router";
import PageHeader from "../util/page-header";
import CourseCardComponent from "./course-card.component";
import CourseAction from "./course.action";
import StateView from "../util/state-view";
import CategoryAction from "../category/category.action";

export default function CoursesComponent() {
    const courseAction = new CourseAction();
    const categoryAction = new CategoryAction();
    const {data: courses, isLoading, error} = courseAction.getCourses();
    const {data: categories} = categoryAction.getCategories();
    const {push} = useRouter();

    return (
        <div className={"container mx-auto"}>
            <PageHeader title={"Courses"} buttonTitle={"+ Add course"} handleClick={() => push("/courses/new")}
                        items={[]}/>
            <div className={"px-container grid grid-cols-1 md:grid-cols-3 md:gap-4"}>
                {isLoading ? <StateView title={"Loading"}/> : null}
                {courses ? courses.map(course => (
                    <CourseCardComponent categories={categories ?? []} key={course.id} course={course}/>
                )) : null}
                {error ? error.message : null}
            </div>
        </div>
    )
}
