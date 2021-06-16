import useInitialProps from "../../../../hooks/use.initial-props";
import {CourseRes} from "../../../../models/course";
import {URLPath} from "../../../../services/http/URLPath";
import {useState} from "react";
import Spinner from "../../../../modules/util/spinner.component";
import PageHeader from "../../../../modules/util/page-header";
import ContentComponent from "../../../../modules/content/content.component";
import useGetCourse from "../../../../hooks/use.get-course";
import useGetContent from "../../../../hooks/use.get-content";

interface ContentPageProps {
    courseId: number;
    contentId: number;
}


export default function ContentPage(props: ContentPageProps) {
    const {courseId, contentId} = props;
    const {data: courseRes, loading} = useInitialProps<CourseRes>(URLPath.course.byId(courseId));
    const template = useGetContent(courseId, contentId);
    const [course, setCourse] = useState(template && template.course ? template.course.course : null);
    const [role, setRole] = useState(template && template.course  ? template.course.role : null);
    const [title, setTitle] = useState(template && template.content  ? template.content.title : null);

    console.log(template, "Template");

    if (loading && !course) {
        return <Spinner/>;
    }
    if (!course) {
        if (courseRes) {
            setRole(courseRes.role);
            setCourse(courseRes.course);
        }

        return null;
    }

    return (
        <div>
            <div className={"container mx-auto px-4 md:px-0"}>
                <PageHeader title={title} items={[
                    {
                        title: "Courses",
                        path: "/courses"
                    },
                    {
                        title: course.title,
                        path: `/courses/${courseId}`
                    },
                    {
                        title: title
                    }
                ]}/>
            </div>
            <ContentComponent updateContent={content => setTitle(content.title)} contentId={contentId} course={course}
                              role={role}/>
        </div>
    );
}


ContentPage.getInitialProps = ({query: {course_id, content_id}}) => {
    return {
        courseId: course_id,
        contentId: content_id
    }
}
