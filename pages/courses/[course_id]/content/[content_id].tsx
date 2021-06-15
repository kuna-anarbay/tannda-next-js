import CoursePage from "../index";

interface ContentPageProps {
    courseId: number;
    contentId: number;
}


export default function ContentPage() {

}


ContentPage.getInitialProps = ({query: {course_id, content_id}}) => {
    return {
        courseId: course_id,
        contentId: content_id
    }
}
