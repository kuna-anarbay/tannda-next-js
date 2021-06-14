import AuthService from "../../services/auth.service";
import {Field, Form, Formik} from "formik";
import {useState} from "react";
import {useAppData} from "../app/app-data-provider";
import r from "../util/r";
import Button from "../util/button";
import {IMaskInput} from 'react-imask';
import {useRouter} from "next/router";
import Link from "next/link";

export default function LoginComponent() {
    const [loading, setLoading] = useState(false);
    const authService = new AuthService();
    const {showError, setUser} = useAppData();
    const {push} = useRouter();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const user = await authService.login({
                username: values.phone.replaceAll(" ", ""),
                password: values.password
            });
            setUser(user);
            await push("/courses");
            setLoading(false);
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    }

    return (
        <div className={"px-4 mx-auto md:w-4/12 py-20"}>
            <Formik initialValues={{}} onSubmit={handleSubmit}>
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
                                <Field name={"phone"} render={({field}) => (
                                    <IMaskInput {...field}
                                                type={"tel"}
                                                placeholder={r.string.phoneNumber}
                                                mask={"+{7} 000 000 00 00"}/>
                                )}/>
                            </div>
                            <div>
                                <label>
                                    {r.string.password}
                                </label>
                                <Field type={"password"} name={"password"}
                                       placeholder={r.string.password}/>
                            </div>
                            <div className={"text-right text-primary text-footnote"}>
                                <Link href={"/auth/forgot-password"}>
                                    {r.string.forgotPassword}
                                </Link>
                            </div>
                            <Button className={"btn btn-primary"}
                                    title={r.string.login}
                                    loading={loading}
                                    type={"submit"}/>
                            <div className={"text-center text-footnote"}>
                                {r.string.noAccount} <Link href={"/auth/register"}><a className={"text-primary"}>{r.string.register}</a></Link>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
