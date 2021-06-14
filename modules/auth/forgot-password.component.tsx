import AuthService from "../../services/auth.service";
import {Field, Form, Formik} from "formik";
import {getIcon, IconType} from "../util/icon";
import {useState} from "react";
import {useAppData} from "../app/app-data-provider";
import r from "../util/r";
import Button from "../util/button";
import {IMaskInput} from 'react-imask';
import {useRouter} from "next/router";

export default function ForgotPasswordComponent() {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const authService = new AuthService();
    const {showError, showSuccess, setUser} = useAppData();
    const [loginRes, setLoginRes] = useState(null);
    const {push} = useRouter();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            if(step === 0) {
                const formattedPhone = values.phone.replaceAll(" ", "");
                const message = await authService.forgotPassword(formattedPhone);
                setPhone(formattedPhone);
                setStep(1);
                showSuccess(message);
            } else if (step === 1) {
                const loginRes = await authService.verifyPhone({
                    phone: phone,
                    code: values.code.replaceAll(" ", "")
                });
                setLoginRes(loginRes);
                setStep(2);
            } else {
                await authService.resetPassword(values.password);
                setUser(loginRes);
                await push("/courses");
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
                <div className={"h-0.25 w-10 " + (step > 0 ? "bg-primary" : "bg-border")}/>
                <div className={"h-2.5 w-2.5 rounded-full " + (step > 0 ? "bg-primary" : "border border-border")}/>
                <div className={"h-0.25 w-10 " + (step > 1 ? "bg-primary" : "bg-border")}/>
                <div className={"h-2.5 w-2.5 rounded-full " + (step > 1 ? "bg-primary" : "border border-border")}/>
            </div>
            <Formik initialValues={{}} onSubmit={handleSubmit}>
                <Form>
                    <div className={"space-y-8"}>
                        <div>
                            <h2 className={"text-title1 font-bold"}>
                                {r.string.forgotPassword}
                            </h2>
                            <p className={"text-base text-label-secondary"}>
                                {r.string.registerDescription}
                            </p>
                        </div>
                        {step === 1 ? (
                            <div
                                className={"border border-border space-x-3 flex justify-between items-center rounded-md p-4"}>
                                <div>
                                    <p className={"text-subheadline"}>
                                        {phone}
                                    </p>
                                    <p className={"text-footnote text-label-light"}>
                                        {r.string.phoneNotConfirmed}
                                    </p>
                                </div>
                                <div onClick={() => setStep(0)}>
                                    {getIcon(IconType.Pencil, "text-title3 font-medium text-primary")}
                                </div>
                            </div>
                        ) : null}
                        <div className={"space-y-4"}>
                            {step > 0 ? (
                                step > 1 ? (
                                    <div>
                                        <label>
                                            {r.string.password}
                                        </label>
                                        <Field type={"password"} name={"password"}
                                               placeholder={r.string.password}/>
                                    </div>
                                ) : (
                                    <div>
                                        <label>
                                            {r.string.code}
                                        </label>
                                        <Field name={"code"} render={({field}) => (
                                            <IMaskInput
                                                {...field}
                                                inputMode={"numeric"}
                                                pattern={"[0-9]*"}
                                                autoComplete={"one-time-code"}
                                                type={"text"}
                                                placeholder={r.string.code}
                                                mask={"000 000"}/>
                                        )}/>
                                    </div>
                                )
                            ) : (
                                <div>
                                    <label>
                                        {r.string.phoneNumber}
                                    </label>
                                    <Field name={"phone"} render={({field}) => (
                                        <IMaskInput {...field}
                                                    type={"tel"}
                                                    placeholder={r.string.phoneNumber}
                                                    mask={"+{7} 000 000 00 00"}/>
                                    )}/>
                                </div>
                            )}
                            <Button className={"btn btn-primary"}
                                    title={step > 0 ? (step > 1 ? r.string.resetPassword : r.string.confirm) : r.string.sendCode}
                                    loading={loading}
                                    type={"submit"}/>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
