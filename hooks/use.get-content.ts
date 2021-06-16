import {useAppData} from "../modules/app/app-data-provider";
import {CourseRes} from "../models/course";
import useGetCourse from "./use.get-course";
import {Content} from "../models/content";

interface ContentElement {
    course: CourseRes;
    content?: Content;
}

export default function useGetContent(courseId: number, contentId: number): ContentElement {
    const {getCache} = useAppData();
    const course = useGetCourse(courseId);
    const contents = getCache("contents");

    if (!contents) return {course};

    const content = contents.find(c => c.id === contentId);
    if (!content) return {course};

    return {course, content}
}
