import {ErrorMessage} from "formik";

interface ErrorAlertProps {
    name: string;
}

export default function ErrorAlert(props: ErrorAlertProps) {
    const {name} = props;

    return (
        <div className={"text-red text-footnote"}>
            <ErrorMessage name={name}/>
        </div>
    )
}