import Button from "../util/button";
import {Field, Form, Formik, FormikValues} from "formik";
import useTranslation from "next-translate/useTranslation";
import r from "../util/r";
import {useAppData} from "../app/app-data-provider";
import {useState} from "react";
import {useToasts} from "react-toast-notifications";
import {useRouter} from "next/router";
import AuthService from "../../services/auth.service";

export default function LoginComponent() {
    const authService = new AuthService();
    const {addToast} = useToasts();
    const [loading, setLoading] = useState(false);
    const {setUser} = useAppData();
    const {push} = useRouter();
    const {t} = useTranslation();

    const login = async (values: FormikValues) => {
        setLoading(true);
        try {
            const loginData = await authService.login({
                username: values.phone.replaceAll(" ", ""),
                password: values.password
            });
            setUser(loginData);
            setLoading(false);
            await push("/");
        } catch (err) {
            setLoading(false);
            addToast(err.message, {autoDismiss: true, appearance: "error"});
        }
    }

    return (
        <div className={"px-container mx-auto"}>
            <div className={"grid grid-cols-1 md:grid-cols-2"}>
                <div className={"auth"}>
                    <div className={"auth-content"}>
                        <div className={"auth-header"}>
                            <h2 className={"auth-title"}>
                                {t(r.string.loginToYourAccount)}
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
                            onSubmit={login}>
                            <Form className={"auth-form"}>
                                <div>
                                    <label className={"block text-caption1 text-label-light"}>
                                        {t(r.string.phoneNumber)}
                                    </label>
                                    <Field name={"phone"} placeholder={t(r.string.phoneNumber)}/>
                                </div>
                                <div>
                                    <label className={"block text-caption1 text-label-light"}>
                                        {t(r.string.password)}
                                    </label>
                                    <Field required={true}
                                           type={"password"}
                                           id={"password"}
                                           name={"password"}
                                           placeholder={t(r.string.password)}
                                           className="input-text"/>
                                </div>
                                <Button className={"btn btn-primary btn-sm"} title={t(r.string.login)}
                                        loading={loading}
                                        type={"submit"}/>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}
