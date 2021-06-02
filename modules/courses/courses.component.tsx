import {useRouter} from "next/router";
import PageHeader from "../util/page-header";
import CourseService from "../../services/course.service";
import {useEffect, useState} from "react";
import Course from "./course.entity";
import CourseCardComponent from "./course-card.component";
import StateView from "../util/state-view";

export default function CoursesComponent() {
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState(Array<Course>());
    const courseService = new CourseService();
    const {push} = useRouter();

    useEffect(() => {
        getCourses();
    }, [])

    const getCourses = async () => {
        try {
            const data = await courseService.getCourses();
            setLoading(false);
            setCourses(data);
        } catch (err) {
            setLoading(false);
        }
    }


    return (
        <div className={"container mx-auto"}>
            <PageHeader title={"Courses"} buttonTitle={"+ Add course"} handleClick={() => push("/courses/new")}
                        items={[]}/>
            <div className={"px-container grid grid-cols-1 md:grid-cols-3 md:gap-4"}>
                {loading ? <StateView title={"Loading"}/> : null}
                {courses ? courses.map(course => (
                    <CourseCardComponent key={course.id} course={course}/>
                )) : null}
                {/*{error ? error.message : null}*/}
            </div>
        </div>
    )
}
