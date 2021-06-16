import {useAppData} from "../modules/app/app-data-provider";
import Course, {CourseRes} from "../models/course";


export default function useGetCourse(id: number): CourseRes {
    const {getCache} = useAppData();
    const courses = getCache("courses") as Course[];

    if (!courses) return null;

    const course = courses.find(c => c.id === id);
    if (!course) return null;

    return {course, role: course.member.role};
}
