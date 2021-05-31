import {URLPath} from "../../services/store/http/URLPath";
import {RegisterReq, RegisterRes} from "./dto/register.dto";
import {LoginReq, LoginRes} from "./dto/login.dto";
import {mutationRequest} from "../../services/store/http/AxiosInstance";

export default class AuthAction {

    sendCode(phone: string) {
        return mutationRequest<LoginRes>({
            method: "POST",
            url: URLPath.auth.sendCode,
            data: {phone}
        });
    }

    register(data: RegisterReq) {
        return mutationRequest<RegisterRes>({
            method: "POST",
            url: URLPath.auth.register,
            data: data
        });
    }

    login() {
        return mutationRequest<LoginRes, LoginReq>({
            method: "POST",
            url: URLPath.auth.login
        });
    }

    refreshToken() {
        return mutationRequest<LoginRes>({
            method: "POST",
            url: URLPath.auth.refreshToken
        })
    }
}
