import ContentInfoView from "./content-info.view";
import {Content} from "../../models/content.entity";
import ContentInfoService from "./content-info.service";
import {useAppData} from "../app/app-data-provider";
import {useState} from "react";
import {Question} from "../../models/question.entity";

interface ContentInfoControllerProps {
    courseId: number;
    content: Content;
    relationId?: number;
}

export default function ContentInfoController(props: ContentInfoControllerProps) {
    const {content, relationId, courseId} = props;
    const contentInfoService = new ContentInfoService();
    const {showError} = useAppData();
    const [questions, setQuestions] = useState(Array<Question>());

    const startSubmission = async () => {
        try {
            const data = await contentInfoService.startSubmission(courseId, relationId);
            setQuestions(data);
        } catch (err) {
            showError(err.message);
        }
    }

    return <ContentInfoView courseId={courseId}
                            relationId={relationId}
                            questions={questions}
                            content={content}
                            getSubmission={startSubmission}/>
}
