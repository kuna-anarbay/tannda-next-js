import CourseController from "../../../modules/course/course.controller";
import {GetStaticProps} from "next";

export interface CoursePageProps {
    courseId: number;
}

export default function CoursePage(props: CoursePageProps) {
    const {courseId} = props;
    return <CourseController courseId={courseId}/>
}

CoursePage.getInitialProps = ({query: {course_id}}) => {
    return {
        courseId: parseInt(course_id)
    }
}
