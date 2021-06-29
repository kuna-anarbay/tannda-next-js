import AuthService from "../../services/auth.service";
import {Field, Form, Formik} from "formik";
import {GetIcon, IconType} from "../util/icon";
import {useState} from "react";
import {useAppData} from "../app/app-data-provider";
import Button from "../util/button";
import {IMaskInput} from 'react-imask';
import {useRouter} from "next/router";
import {strings} from "../util/strings";


export default function RegisterComponent() {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [codeSent, setCodeSent] = useState(false);
    const authService = new AuthService();
    const {showError, showSuccess, setUser} = useAppData();
    const {push} = useRouter();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            if (codeSent) {
                const user = await authService.register({
                    phone: phone,
                    code: values.code.replaceAll(" ", ""),
                    firstName: values.firstName,
                    lastName: values.lastName,
                    password: values.password
                });
                setUser(user);
                await push("/courses");
            } else {
                const formattedPhone = values.phone.replaceAll(" ", "");
                const message = await authService.sendCode(formattedPhone);
                setPhone(formattedPhone);
                setCodeSent(true);
                showSuccess(message);
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    }

    return (
        <div className={"px-4 mx-auto md:w-4/12 py-16"}>
            <div className={"mb-12 flex items-center space-x-1.5"}>
                <div className={"h-2.5 w-2.5 rounded-full bg-primary"}/>
                <div className={"h-0.25 w-10 " + (codeSent ? "bg-primary" : "bg-border")}/>
                <div className={"h-2.5 w-2.5 rounded-full " + (codeSent ? "bg-primary" : "border border-border")}/>
            </div>
            <Formik initialValues={{}} onSubmit={handleSubmit}>
                <Form>
                    <div className={"space-y-8"}>
                        <div>
                            <h2 className={"text-title1 font-bold"}>
                                {strings.register}
                            </h2>
                            <p className={"text-base text-label-secondary"}>
                                {strings.registerDescription}
                            </p>
                        </div>
                        {codeSent ? (
                            <div
                                className={"border border-border space-x-3 flex justify-between items-center rounded-md p-4"}>
                                <div>
                                    <p className={"text-subheadline"}>
                                        {phone}
                                    </p>
                                    <p className={"text-footnote text-label-light"}>
                                        {strings.phoneNotConfirmed}
                                    </p>
                                </div>
                                <div onClick={() => setCodeSent(false)}>
                                    {GetIcon(IconType.Pencil, "text-title3 font-medium cursor-pointer text-primary")}
                                </div>
                            </div>
                        ) : (
                            <div className={"bg-background-secondary space-x-3 flex items-center rounded-lg p-4"}>
                                <div>
                                    {GetIcon(IconType.Lock, "text-title3 font-medium")}
                                </div>
                                <p className={"text-footnote text-label-secondary"}>
                                    {strings.yourAccountSecure}
                                </p>
                            </div>
                        )}
                        <div className={"space-y-4"}>
                            {codeSent ? (
                                <div className={"space-y-4"}>
                                    <div>
                                        <label>
                                            {strings.firstName}
                                        </label>
                                        <Field type={"text"} name={"firstName"}
                                               placeholder={strings.firstName}/>
                                    </div>
                                    <div>
                                        <label>
                                            {strings.lastName}
                                        </label>
                                        <Field type={"text"} name={"lastName"}
                                               placeholder={strings.lastName}/>
                                    </div>
                                    <div>
                                        <label>
                                            {strings.password}
                                        </label>
                                        <Field type={"password"} name={"password"}
                                               placeholder={strings.password}/>
                                    </div>
                                    <div>
                                        <label>
                                            {strings.code}
                                        </label>
                                        <Field name={"code"} render={({field}) => (
                                            <IMaskInput
                                                {...field}
                                                inputMode={"numeric"}
                                                pattern={"[0-9]*"}
                                                autoComplete={"one-time-code"}
                                                type={"text"}
                                                placeholder={strings.code}
                                                mask={"000 000"}/>
                                        )}/>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label>
                                        {strings.phoneNumber}
                                    </label>
                                    <Field name={"phone"} render={({field}) => (
                                        <IMaskInput {...field}
                                                    type={"tel"}
                                                    placeholder={strings.phoneNumber}
                                                    mask={"+{7} 000 000 00 00"}/>
                                    )}/>
                                </div>
                            )}
                            <Button className={"btn btn-primary "}
                                    title={codeSent ? strings.register : strings.sendCode}
                                    loading={loading}
                                    type={"submit"}/>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
