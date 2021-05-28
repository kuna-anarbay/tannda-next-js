import {useState} from "react";
import {useDispatch} from "react-redux";
import AuthAction from "./auth.action";

export default function RegisterComponent() {
    const dispatch = useDispatch();
    const authAction = new AuthAction();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        const {firstName, lastName, phone, password, code} = e.target.values;
        dispatch(authAction.register({
            firstName: firstName.value,
            lastName: lastName.value,
            phone: phone.value,
            password: password.value,
            code: code.value
        }));

    }

    return (
        <div className={"px-container mx-auto"}>
            <div className={"grid grid-cols-1 md:grid-cols-2"}>
                <div className={"auth"}>
                    <div className={"auth-content"}>
                        <div className={"auth-header"}>
                            <h2 className={"auth-title"}>
                                Register a new account
                            </h2>
                            <p className={"auth-meta"}>
                                Hello folks!! This is our new travel app design. Tools Used: Adobe XD Eager to hear your
                                thoughts and comments!
                            </p>
                        </div>
                        <form className={"auth-form"}>
                            <div>
                                <label className={"block text-caption1 text-label-light"}>
                                    First name
                                </label>
                                <input name={"title"}
                                       placeholder={"Course name"}
                                       className="input-text"/>
                            </div>
                            <div>
                                <label className={"block text-caption1 text-label-light"}>
                                    Last name
                                </label>
                                <input name={"title"}
                                       placeholder={"Course name"}
                                       className="input-text"/>
                            </div>
                            <div>
                                <label className={"block text-caption1 text-label-light"}>
                                    Phone
                                </label>
                                <input name={"title"}
                                       placeholder={"Phone"}
                                       className="input-text"/>
                            </div>
                            <div>
                                <label className={"block text-caption1 text-label-light"}>
                                    Password
                                </label>
                                <input name={"title"}
                                       placeholder={"Password"}
                                       className="input-text"/>
                            </div>
                            <button className={"btn btn-primary"}>
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
