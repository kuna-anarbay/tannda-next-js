import {RequestAction} from '@redux-requests/core';
import {URLPath} from "../http/URLPath";
import {HTTPMethod} from "../http/HTTPMethod";
import {authConstants} from "../constants/auth.constants";
import {Login} from "../../models/Login";
import {Token} from "../../models/Token";
import {BecomePartner} from "../../models/BecomePartner";

export class AuthAction {
    static login(body: Login): RequestAction<Token> {
        return {
            type: authConstants.LOGIN,
            request: {
                url: URLPath.auth.login,
                method: HTTPMethod.POST,
                body: body
            }
        }
    }

    static becomePartner(body: BecomePartner): RequestAction<BecomePartner> {
        return {
            type: authConstants.BECOME_PARTNER,
            request: {
                url: URLPath.auth.becomePartner,
                method: HTTPMethod.POST,
                body: body
            }
        }
    }

}

