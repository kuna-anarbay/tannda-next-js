import CourseComponent from "../../../modules/courses/course.component";

export interface CoursePageProps {
    id: number;
}

export default function CoursePage(props: CoursePageProps) {
    return <CourseComponent id={props.id}/>
}

CoursePage.getInitialProps = ({query: {course_id}}) => {
    return {
        id: course_id
    }
}
