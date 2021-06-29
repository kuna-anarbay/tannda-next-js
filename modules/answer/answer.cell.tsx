import {Question, QuestionType} from "../../models/question.entity";
import AnswerOptionCell from "./answer-option.cell";
import UploadBox from "../upload/upload.box";
import {CreateAnswerRequestDto} from "./answer.dto";
import {Field} from "formik";
import {Resource} from "../../models/resource.entity";

interface AnswerCellProps {
    question: Question;
    values: CreateAnswerRequestDto;
    index: number;
    file: { resource: Resource, questionId: number, file: File };
    selectFile: (e, questionId) => void;
    removeFile: (questionId: number) => void;
}

export default function AnswerCell(props: AnswerCellProps) {
    const {question, values, index, file, selectFile, removeFile} = props;

    return (
        <div className={"py-2 px-3 space-y-2 border border-border rounded-1.5"}>
            <p className={"text-footnote"}>
                {question.title}
            </p>
            <a className={"py-0.5 px-1.5 bg-background-secondary rounded-1 text-caption2 uppercase"}>
                {question.points} points
            </a>
            <Field className={"hidden"} value={question.id} name={`answers[${index}].questionId`} type={"text"} />
            <div>
                {[QuestionType.SELECT, QuestionType.MULTIPLE_SELECT].includes(question.type) && question.options.map(option => (
                    <AnswerOptionCell options={values?.options ?? []} name={`answers[${index}].options`} type={question.type} option={option}/>
                ))}
                {/*{[QuestionType.UPLOAD].includes(question.type) && (*/}
                {/*    <UploadBox removeFile={removeFile} file={file} selectFile={e => selectFile(e, question.id)} />*/}
                {/*)}*/}
                {[QuestionType.TEXT].includes(question.type) && (
                    <Field as={"textarea"}
                           rows={2}
                           name={`answers[${index}].text`}
                    />
                )}
            </div>
        </div>
    )
}
