import {getIcon, IconType} from "../util/icon";
import {Field} from "formik";

interface QuestionOptionCellProps {
    name: string;
    index: number;
    remove: (index: number) => void;
}

export default function QuestionOptionCell(props: QuestionOptionCellProps) {
    const {remove, index, name} = props;

    return (
        <div className={"py-2 flex items-center space-x-2 justify-between"}>
            <Field name={`${name}.title`} type={"text"} className={"flex-grow field-sm"}/>
            <Field name={`${name}.correct`} as="select"
                   className={"field-sm flex-shrink"}>
                <option value={"true"}>
                    Correct
                </option>
                <option value={"false"}>
                    Not correct
                </option>
            </Field>
            <div onClick={() => remove(index)}
                 className={"cursor-pointer flex items-center justify-center p-1 rounded-full bg-background-secondary"}>
                {getIcon(IconType.XMark, "text-primary")}
            </div>
        </div>
    )
}
