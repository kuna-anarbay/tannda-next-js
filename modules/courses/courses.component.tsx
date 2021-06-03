import {useRouter} from "next/router";
import PageHeader from "../util/page-header";
import CourseService from "../../services/course.service";
import {useEffect, useState} from "react";
import Course from "./course.entity";
import CourseCardComponent from "./course-card.component";
import StateView from "../util/state-view";
import {useAppData} from "../app/app-data-provider";
import {isManager} from "../../models/role";

class Response<T> {
    loading: boolean = false;
    data?: T = undefined;
    error?: Error = undefined;
}



export default function CoursesComponent() {
    // const [courses, setCourses] = useState(Array<Course>());
    const [{ loading, data: courses, error}, setData] = useState(new Response<Course[]>());
    const courseService = new CourseService();
    const {push} = useRouter();
    const {role} = useAppData();

    useEffect(() => {
        getCourses();
    }, [])

    const getCourses = async () => {
        setData({ loading: true });
        try {
            const data = await courseService.getCourses();
            setData({ loading: false, data: data });
        } catch (err) {
            setData({ loading: true, error: err });
        }
    }


    return (
        <div className={"container mx-auto"}>
            <PageHeader title={"Courses"}
                        buttonTitle={isManager(role) ? "+ Add course" : null}
                        handleClick={() => push("/courses/new")}
                        items={[]}/>
            <div className={"container courses-grid"}>
                {loading ? <StateView title={"Loading"}/> : null}
                {courses ? courses.map(course => (
                    <CourseCardComponent key={course.id} course={course}/>
                )) : null}
            </div>
        </div>
    )
}
