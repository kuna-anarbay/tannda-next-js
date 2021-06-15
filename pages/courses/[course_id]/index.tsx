import CourseComponent from "../../../modules/courses/course.component";
import PageHeader from "../../../modules/util/page-header";
import Course, {CourseRes} from "../../../models/course";
import useInitialProps from "../../../hooks/use.initial-props";
import {URLPath} from "../../../services/http/URLPath";
import Spinner from "../../../modules/util/spinner.component";
import {MemberRole} from "../../../models/member";
import {useState} from "react";

export interface CoursePageProps {
    id: number;
    course: Course | null;
    role: MemberRole | null;
    courseEdited?: (Course) => void;
}

export default function CoursePage(props: CoursePageProps) {
    const {id} = props;
    const {data: courseRes, loading} = useInitialProps<CourseRes>(URLPath.course.byId(id));
    const [course, setCourse] = useState(null);

    if (loading) {
        return <Spinner/>;
    }

    if (!courseRes) {
        return null;
    }
    const {role} = courseRes;
    if (!course) {
        setCourse(courseRes.course);
    }
    if(!course) {
        return null;
    }

    return (
        <div>
            <div className={"container mx-auto px-4 md:px-0"}>
                <PageHeader title={course.title} items={[
                    {
                        title: "Courses",
                        path: "/courses"
                    },
                    {
                        title: course.title
                    }
                ]}/>
            </div>
            <CourseComponent id={id} course={course} courseEdited={c => setCourse(c)} role={role}/>
        </div>
    );
}

CoursePage.getInitialProps = ({query: {course_id}}) => {
    return {
        id: course_id
    }
}
