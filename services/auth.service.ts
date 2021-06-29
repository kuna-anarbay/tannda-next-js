import {LoginReq, LoginRes} from "../modules/auth/dto/login.dto";
import {URLPath} from "./URLPath";
import {RegisterReq} from "../modules/auth/dto/register.dto";
import {VerifyPhoneReq} from "../modules/auth/dto/verify-phone.dto";
import NetworkManager from "./network-manager";

export default class AuthService extends NetworkManager {

    public constructor() {
        super();
    }

    login = async (body: LoginReq) => {
        return await this.instance.post<LoginRes>(URLPath.auth.login, body);
    }

    logOut = async () => {
        return await this.instance.delete<string>(URLPath.auth.logOut);
    }

    refreshToken = async () => {
        return await this.instance.post<LoginRes>(URLPath.auth.refreshToken);
    }

    sendCode = async (phone: string) => {
        return await this.instance.post<string>(URLPath.auth.sendCode, {phone});
    }

    register = async (body: RegisterReq) => {
        return await this.instance.post<LoginRes>(URLPath.auth.register, body);
    }

    forgotPassword = async (phone: string) => {
        return await this.instance.post<string>(URLPath.auth.forgotPassword, {phone});
    }

    verifyPhone = async (body: VerifyPhoneReq) => {
        return await this.instance.post<LoginRes>(URLPath.auth.verifyPhone, body);
    }

    resetPassword = async (password: string) => {
        return await this.instance.post<string>(URLPath.auth.resetPassword, {password})
    }
}


