import {Question} from "../../models/question";
import {SubmitRequestDto} from "./submission.dto";
import {FieldArray, Form, Formik} from "formik";
import {Resource} from "../../models/resource";
import Button from "../util/button";
import AnswerCell from "../answer/answer.cell";

interface SubmissionViewProps {
    questions: Question[];
    submit: (body: SubmitRequestDto) => void;
    files: Array<{ resource: Resource, questionId: number, file: File }>;
    selectFile: (e, questionId) => void;
    removeFile: (questionId: number) => void;
}

export default function SubmissionView(props: SubmissionViewProps) {
    const {questions, submit, files, selectFile, removeFile} = props;

    const initialValues = {
        answers: questions.map(q => {
            return {
                questionId: q.id,
                text: "",
                options: []
            }
        })
    }

    return (
        <Formik initialValues={initialValues} onSubmit={submit}>
            {({values, isSubmitting}) => (
                <Form className={"space-y-4"}>
                    <FieldArray name={"answers"}>
                        {() => (
                            <div className={"space-y-4"}>
                                {questions.map((question, index) => (
                                    <AnswerCell file={files.find(f => f.questionId === question.id)}
                                                selectFile={selectFile}
                                                removeFile={removeFile}
                                                index={index}
                                                values={values.answers[index]}
                                                question={question}/>
                                ))}
                            </div>
                        )}
                    </FieldArray>
                    <Button type={"submit"} className={"btn btn-primary"} loading={isSubmitting} title={"Submit"}/>
                </Form>
            )}
        </Formik>
    )
}
