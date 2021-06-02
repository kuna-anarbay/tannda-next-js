import AuthService from "../../services/auth.service";

export default function RegisterComponent() {
    const authService = new AuthService();

    function handleSubmit(e) {
        e.preventDefault();

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
