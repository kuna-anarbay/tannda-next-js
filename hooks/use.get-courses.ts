import {useAppData} from "../modules/app/app-data-provider";
import Course from "../models/course";


export default function useGetCourses(): Course[] {
    const {getCache} = useAppData();
    const courses = getCache("courses") as Course[];

    if (!courses) return null;

    return courses;
}
