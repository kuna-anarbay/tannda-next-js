export default function RegisterComponent() {

    return (
        <div className={"auth"}>
            <div className={"auth-content"}>
                <div className={"auth-header"}>
                    <h2 className={"auth-title"}>
                        Register a new account
                    </h2>
                    <p className={"auth-meta"}>
                        Hello folks!! This is our new travel app design. Tools Used: Adobe XD Eager to hear your thoughts and comments!
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
                </form>
            </div>
        </div>
    )
}