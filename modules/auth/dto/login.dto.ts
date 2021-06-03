import User from "../../user/user.entity";
import {UserRole} from "../../../models/role";

export interface LoginReq {
    username: string;
    password: string;
}

export interface LoginRes {
    user: User;
    accessToken: string;
    refreshToken: string;
    role?: UserRole;
}
