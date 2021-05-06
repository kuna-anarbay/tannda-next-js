import {RequestAction} from '@redux-requests/core';
import {URLPath} from "../http/URLPath";
import {HTTPMethod} from "../http/HTTPMethod";
import {authConstants} from "../constants/auth.constants";
import {Token} from "../../../models/Token";

export class AuthAction {
    static login(body: any): RequestAction<Token> {
        return {
            type: authConstants.LOGIN,
            request: {
                url: URLPath.auth.login,
                method: HTTPMethod.POST,
                body: body
            }
        }
    }
}

