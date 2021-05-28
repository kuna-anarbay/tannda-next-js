import AuthAction from "./auth.action";
import Button from "../util/button";
import {useToasts} from "react-toast-notifications";

export default function LoginComponent() {
    const authAction = new AuthAction();
    const {addToast} = useToasts();
    const {data, mutate, isLoading, error} = authAction.login();

    if(error) {
        addToast(error.message);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const {phone, password} = e.target;
        mutate({
            username: phone.value.replaceAll(" ", ""),
            password: password.value
        });
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
                                <input name={"phone"} placeholder={"Phone"}
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
                            <Button className={"btn btn-primary btn-sm"} title={"Login"} loading={isLoading}
                                    type={"submit"}/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
