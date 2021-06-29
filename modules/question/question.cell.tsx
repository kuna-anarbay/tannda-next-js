import {allQuestionTypes, QuestionType} from "../../models/question";
import {CreateQuestionRequestDto} from "../new-exam/new-exam.dto";
import {Field, FieldArray} from "formik";
import QuestionOptionCell from "../question-option/question-option.cell";
import {getIcon, IconType} from "../util/icon";

interface QuestionCellProps {
    index: number;
    remove: (index: number) => void;
    value: CreateQuestionRequestDto;
}

export default function QuestionCell(props: QuestionCellProps) {
    const {index, remove, value} = props;

    return (
        <div className={"py-2 px-3 space-y-2 bg-background-secondary rounded-1.5"}>
            <div className={"flex items-center"}>
                <p className={"flex-grow text-footnote"}>
                    Question {index + 1}
                </p>
                <div onClick={() => remove(index)}
                     className={"cursor-pointer flex items-center justify-center p-1 rounded-full bg-background"}>
                    {getIcon(IconType.XMark, "text-red")}
                </div>
            </div>
            <Field name={`questions[${index}].title`} type={"text"}/>
            <div className={"grid grid-cols-2 gap-4"}>
                <Field name={`questions[${index}].type`} as={"select"}>
                    {allQuestionTypes.map(type => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </Field>
                <Field name={`questions[${index}].points`} type={"number"}/>
            </div>
            <FieldArray name={`questions[${index}].options`}>
                {({remove, push}) => (
                    [QuestionType.SELECT, QuestionType.MULTIPLE_SELECT].includes(value.type) &&
                    <div>
                        {value.options.length > 0 && value.options.map((option, i) => (
                            <QuestionOptionCell name={`questions[${index}].options[${i}]`}
                                                index={i}
                                                remove={remove}/>
                        ))}
                        <a onClick={() => push({title: '', correct: false})}
                           className={"btn btn-outline cursor-pointer btn-sm"}>
                            Add option
                        </a>
                    </div>
                )}
            </FieldArray>
        </div>
    )
}
