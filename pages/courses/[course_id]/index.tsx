import CourseController from "../../../modules/course/course.controller";
import {GetStaticProps} from "next";

export interface CoursePageProps {
    courseId: number;
}

export default function CoursePage(props: CoursePageProps) {
    const {courseId} = props;
    return <CourseController courseId={courseId}/>
}

export const getStaticProps: GetStaticProps = async ({params: {course_id}}) => {
    return {
        props: {
            courseId: parseInt(course_id as string)
        }
    }
}
