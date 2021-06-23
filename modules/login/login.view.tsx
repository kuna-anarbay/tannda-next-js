import {Field, Form, Formik} from "formik";
import r from "../util/r";
import Button from "../util/button";
import {IMaskInput} from 'react-imask';
import * as yup from "yup";
import {LoginRequestDto} from "./login.dto";
import ErrorAlert from "../util/error.alert";


interface LoginViewProps {
    forgotPassword: () => void
    register: () => void;
    loading: boolean;
    login: (body: LoginRequestDto) => void;
}

export default function LoginView(props: LoginViewProps) {
    const {forgotPassword, loading, login, register} = props;

    const loginDefaultValues = {
        username: "+7",
        password: ""
    };

    const loginSchema = yup.object().shape({
        username: yup.string()
            .required("Enter phone number"),
        password: yup.string()
            .required("Enter password")
    });

    return (
        <div className={"px-4 mx-auto md:w-4/12 py-20"}>
            <Formik initialValues={loginDefaultValues}
                    validationSchema={loginSchema}
                    onSubmit={login}>
                <Form>
                    <div className={"space-y-8"}>
                        <div>
                            <h2 className={"text-title1 font-bold"}>
                                {r.string.login}
                            </h2>
                            <p className={"text-base text-label-secondary"}>
                                {r.string.loginDescription}
                            </p>
                        </div>
                        <div className={"space-y-4"}>
                            <div>
                                <label>
                                    {r.string.phoneNumber}
                                </label>
                                <Field name={"username"} render={({field}) => (
                                    <IMaskInput {...field}
                                                name={"username"}
                                                required={true}
                                                type={"tel"}
                                                placeholder={r.string.phoneNumber}
                                                mask={"+{7} 000 000 00 00"}/>
                                )}/>
                                <ErrorAlert name={"username"}/>
                            </div>
                            <div>
                                <label>
                                    {r.string.password}
                                </label>
                                <Field type={"password"} name={"password"}
                                       placeholder={r.string.password}/>
                                <ErrorAlert name={"password"}/>
                            </div>
                            <div className={"text-right text-primary text-footnote"}>
                                <a onClick={forgotPassword}>
                                    {r.string.forgotPassword}
                                </a>
                            </div>
                            <Button className={"btn btn-primary"}
                                    title={r.string.login}
                                    loading={loading}
                                    type={"submit"}/>
                            <div className={"text-center text-footnote"}>
                                {r.string.noAccount} <a onClick={register}><a
                                className={"text-primary"}>{r.string.register}</a></a>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}