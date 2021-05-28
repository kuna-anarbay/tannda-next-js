import {RequestAction} from "@redux-requests/core";
import {HTTPMethod} from "../../services/store/http/HTTPMethod";
import {URLPath} from "../../services/store/http/URLPath";
import {RegisterReq, RegisterRes} from "./dto/register.dto";
import {LoginReq, LoginRes} from "./dto/login.dto";
import {authConstants} from "./auth.constants";

export default class AuthAction {

    sendCode(phone: string): RequestAction<void> {
        return {
            type: authConstants.SEND_CODE,
            request: {
                method: HTTPMethod.POST,
                url: URLPath.auth.sendCode,
                data: {
                    phone
                }
            }
        }
    }

    register(data: RegisterReq): RequestAction<RegisterRes> {
        return {
            type: authConstants.REGISTER,
            request: {
                method: HTTPMethod.POST,
                url: URLPath.auth.register,
                data: data
            }
        }
    }

    login(data: LoginReq): RequestAction<LoginRes> {
        return {
            type: authConstants.LOGIN,
            request: {
                method: HTTPMethod.POST,
                url: URLPath.auth.login,
                data: data
            }
        }
    }

    refreshToken(): RequestAction<string> {
        return {
            type: "REFRESH_TOKEN",
            request: {
                method: HTTPMethod.POST,
                url: URLPath.auth.refreshToken
            }
        }
    }
}
