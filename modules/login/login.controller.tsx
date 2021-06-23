import LoginService from "./login.service";
import {useState} from "react";
import LoginView from "./login.view";
import {useRouter} from "next/router";
import {Route} from "../app/route";
import {LoginRequestDto} from "./login.dto";
import {useAppData} from "../app/app-data-provider";

interface LoginControllerProps {
    loginService: LoginService;
}

export default function LoginController(props: LoginControllerProps) {
    const {loginService} = props;
    const [loading, setLoading] = useState(false);
    const {showError, setUser} = useAppData();
    const {push} = useRouter();

    const forgotPassword = async () => {
        await push(Route.auth.forgotPassword);
    }

    const register = async () => {
        await push(Route.auth.register);
    }

    const login = async (body: LoginRequestDto) => {
        setLoading(true);
        try {
            const response = await loginService.login(body);
            setUser(response);
            await push(Route.courses.my);
        } catch (err) {
            showError(err.message);
            setLoading(false);
        }
    }


    return <LoginView forgotPassword={forgotPassword} register={register} loading={loading} login={login}/>;
}