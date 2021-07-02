import {Field, Form, Formik} from "formik";
import Button from "../util/button";
import {IMaskInput} from 'react-imask';
import {LoginRequestDto} from "./login.dto";
import ErrorAlert from "../util/error.alert";
import {strings} from "../../resources/strings";

interface LoginViewProps {
    forgotPassword: () => void
    register: () => void;
    login: (body: LoginRequestDto) => void;
}

export default function LoginView(props: LoginViewProps) {
    const {forgotPassword, login, register} = props;

    const loginDefaultValues = {
        username: "+7",
        password: ""
    };

    return (
        <div className={"px-4 mx-auto md:w-4/12 py-20"}>
            <Formik initialValues={loginDefaultValues}
                    onSubmit={login}>
                { ({ isSubmitting }) => (
                    <Form>
                        <div className={"space-y-8"}>
                            <div>
                                <h2 className={"text-title1 font-bold"}>
                                    {strings.login}
                                </h2>
                                <p className={"text-base text-label-secondary"}>
                                    {strings.loginDescription}
                                </p>
                            </div>
                            <div className={"space-y-4"}>
                                <div>
                                    <label>
                                        {strings.phoneNumber}
                                    </label>
                                    <Field name={"username"} render={({field}) => (
                                        <IMaskInput {...field}
                                                    name={"username"}
                                                    required={true}
                                                    type={"tel"}
                                                    placeholder={strings.phoneNumber}
                                                    mask={"+{7} 000 000 00 00"}/>
                                    )}/>
                                </div>
                                <div>
                                    <label>
                                        {strings.password}
                                    </label>
                                    <Field type={"password"}
                                           name={"password"}
                                           placeholder={strings.password}/>
                                </div>
                                <div className={"text-right text-primary text-footnote"}>
                                    <a onClick={forgotPassword}>
                                        {strings.forgotPassword}
                                    </a>
                                </div>
                                <Button className={"btn btn-primary"}
                                        title={strings.login}
                                        loading={isSubmitting}
                                        type={"submit"}/>
                                <div className={"text-center text-footnote"}>
                                    {strings.noAccount} <a onClick={register}><a
                                    className={"text-primary"}>{strings.register}</a></a>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
