import AuthAction from "./auth.action";
import {useToasts} from "react-toast-notifications";
import Button from "../util/button";
import NumberFormat from 'react-number-format';
import LocalDatabase from "../../services/localDatabase";
import {useState} from "react";
import {useDispatchRequest} from "@redux-requests/react";

export default function LoginComponent() {
    const [loading, setLoading] = useState(false);
    const {addToast} = useToasts();
    const dispatch = useDispatchRequest();
    const authAction = new AuthAction();

    async function handleSubmit(e) {
        e.preventDefault();

        const {phone, password} = e.target;
        setLoading(true);
        const {data, error} = await dispatch(authAction.login({
            username: phone.value.replaceAll(" ", ""),
            password: password.value
        }));
        setLoading(false);
        if (data) {
            LocalDatabase.instance.setAccessToken(data.accessToken);
            LocalDatabase.instance.setRefreshToken(data.refreshToken);
            LocalDatabase.instance.setCurrentUser(data.user);
        }
        if (error) {
            addToast(error.message, {appearance: "error", autoDismiss: true});
        }
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
                        <form onSubmit={handleSubmit} className={"auth-form"}>
                            <div>
                                <label className={"block text-caption1 text-label-light"}>
                                    Phone
                                </label>
                                <NumberFormat format={"+7 ### ### ####"} name={"phone"} placeholder={"Phone"}
                                              className={"input-text"}/>
                            </div>
                            <div>
                                <label className={"block text-caption1 text-label-light"}>
                                    Password
                                </label>
                                <input name={"password"}
                                       placeholder={"Password"}
                                       className="input-text"/>
                            </div>
                            <Button className={"btn btn-primary btn-sm"} title={"Login"} loading={loading}
                                    type={"submit"}/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
