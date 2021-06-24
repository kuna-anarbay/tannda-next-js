import CourseService from "./course.service";
import {CacheItem, useAppData} from "../app/app-data-provider";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import CourseView from "./course.view";
import Spinner from "../util/spinner.component";

interface CourseControllerProps {
    courseId: number;
}

export default function CourseController(props: CourseControllerProps) {
    const {courseId} = props;
    const courseService = new CourseService();
    const {getItem, showError} = useAppData();
    const {} = useRouter();
    const [course, setCourse] = useState(getItem(CacheItem.COURSES, courseId));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCourse();
    }, []);

    const getCourse = async () => {
        setLoading(!course);
        try {
            const data = await courseService.getCourse(courseId);
            setLoading(false);
            setCourse(data);
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    }

    if (loading) return <Spinner/>
    if (!course) return null;

    return <CourseView loading={loading} course={course}/>
}
