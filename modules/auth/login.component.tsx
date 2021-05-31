import AuthAction from "./auth.action";
import Button from "../util/button";
import {Form, Formik, Field} from "formik";
import InputMask from "react-input-mask";
import LocalDatabase from "../../services/localDatabase";

export default function LoginComponent() {
    const authAction = new AuthAction();
    const {data, mutate, isLoading} = authAction.login();
    if (data) {
        LocalDatabase.instance.configure(data);
    }

    return (
        <div className={"px-container mx-auto"}>
            <div className={"grid grid-cols-1 md:grid-cols-2"}>
                <div className={"auth"}>
                    <div className={"auth-content"}>
                        <div className={"auth-header"}>
                            <h2 className={"auth-title"}>
                                Login to your account
                            </h2>
                            <p className={"auth-meta"}>
                                Hello folks!! This is our new travel app design. Tools Used: Adobe XD Eager to hear your
                                thoughts and comments!
                            </p>
                        </div>
                        <Formik
                            initialValues={{
                                phone: "",
                                password: ""
                            }}
                            onSubmit={(values) => {
                                console.log(values);
                                mutate({
                                    username: values.phone.replaceAll(" ", ""),
                                    password: values.password
                                })
                            }}>
                            <Form className={"auth-form"}>
                                <div>
                                    <label className={"block text-caption1 text-label-light"}>
                                        Phone
                                    </label>
                                    <Field name={"phone"} placeholder={"Phone number"} />
                                </div>
                                <div>
                                    <label className={"block text-caption1 text-label-light"}>
                                        Password
                                    </label>
                                    <Field required={true}
                                           type={"password"}
                                           id={"password"}
                                           name={"password"}
                                           placeholder={"Password"}
                                           className="input-text"/>
                                </div>
                                <Button className={"btn btn-primary btn-sm"} title={"Login"} loading={isLoading}
                                        type={"submit"}/>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}
