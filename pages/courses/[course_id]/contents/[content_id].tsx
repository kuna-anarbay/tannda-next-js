import ContentController from "../../../../modules/content/content.controller";

interface ContentPageProps {
    courseId: number;
    contentId: number;
}

export default function ContentPage(props: ContentPageProps) {
    const {courseId, contentId} = props;
    return <ContentController contentId={contentId} courseId={courseId}/>
}


ContentPage.getInitialProps = ({query: {course_id, content_id}}) => {
    return {
        courseId: course_id,
        contentId: content_id
    }
}
