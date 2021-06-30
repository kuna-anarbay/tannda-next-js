import ContentController from "../../../../modules/content/content.controller";
import {GetStaticProps} from "next";

interface ContentPageProps {
    courseId: number;
    contentId: number;
}

export default function ContentPage(props: ContentPageProps) {
    const {courseId, contentId} = props;
    return <ContentController contentId={contentId} courseId={courseId}/>
}

export const getStaticProps: GetStaticProps = async ({params: {course_id, content_id}}) => {
    return {
        props: {
            courseId: parseInt(course_id as string),
            contentId: parseInt(content_id as string)
        }
    }
}

