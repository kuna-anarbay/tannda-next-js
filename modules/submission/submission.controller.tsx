import {SubmitRequestDto} from "./submission.dto";
import {Question} from "../../models/question";
import SubmissionView from "./submission.view";
import {useState} from "react";
import {Resource} from "../../models/resource";
import {useAppData} from "../app/app-data-provider";
import SubmissionService from "./submission.service";

interface SubmissionControllerProps {
    questions: Question[];
    courseId: number;
    relationId: number;
}

export default function SubmissionController(props: SubmissionControllerProps) {
    const {questions, relationId, courseId} = props;
    const submissionService = new SubmissionService();
    const {validate, showError, showSuccess} = useAppData();
    const [files, setFiles] = useState(Array<{
        file: File,
        resource: Resource,
        questionId: number
    }>());

    const submit = async (body: SubmitRequestDto) => {
        console.log(body);
        try {
            await validate(body);
            // await submissionService.submitAnswers(courseId, relationId, body);
            showSuccess("Successfully submitted");
        } catch (err) {
            showError(err.message);
        }
    }

    const selectFile = (e, questionId) => {
        setFiles([...files, {
            file: e.target.files[0],
            resource: new Resource(e.target.files[0]),
            questionId: questionId
        }]);
    }

    const removeFile = (questionId: number) => {
        setFiles(files.filter(f => f.questionId !== questionId))
    }


    return <SubmissionView removeFile={removeFile}
                           files={files}
                           selectFile={selectFile}
                           questions={questions}
                           submit={submit}/>
}
