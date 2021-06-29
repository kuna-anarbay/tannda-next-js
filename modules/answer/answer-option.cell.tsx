import {QuestionType} from "../../models/question";
import {QuestionOption} from "../../models/question-option";
import {Field} from "formik";
import {GetIcon, IconType} from "../util/icon";

interface AnswerOptionCellProps {
    name: string;
    type: QuestionType;
    option: QuestionOption;
    options: number[];
}

export default function AnswerOptionCell(props: AnswerOptionCellProps) {
    const {type, option, name} = props;
    const options = props.options.map(x => +x);

    const getOptions = () => {
        if (type === QuestionType.SELECT) {
            return [option.id];
        }
        if (options.includes(option.id)) {
            return options.filter(o => o !== option.id);
        } else {
            return [...options, option.id];
        }
    }

    return (
        <div className={"py-1 flex items-center space-x-2"}>
            {type === QuestionType.MULTIPLE_SELECT ? (
                <Field name={name} as={"checkbox"}>
                    {({form}) => (
                        <button type={"button"}
                                onClick={() => form.setFieldValue(name, getOptions())}
                                className={`btn-checkbox ${options.includes(option.id) ? "active" : ""}`}>
                            {GetIcon(options.includes(option.id) ? IconType.Checkmark : null)}
                        </button>
                    )}
                </Field>
            ) : (
                // <Field type="checkbox" name={name} value={option.id} />
                <Field name={name} type="checkbox">
                    {({form}) => (
                        <button type={"button"}
                                onClick={() => form.setFieldValue(name, getOptions())}
                                className={`btn-radio ${options.includes(option.id) ? "active" : ""}`}>
                            <div/>
                        </button>
                    )}
                </Field>
            )}
            <p className={"text-footnote"}>
                {option.title}
            </p>
        </div>
    )
}
