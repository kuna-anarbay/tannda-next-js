import LoginService from "../../modules/login/login.service";
import LoginController from "../../modules/login/login.controller";

export default function LoginPage() {
    const loginService = new LoginService();

    return <LoginController loginService={loginService}/>
}
