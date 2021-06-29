import User from "../../../models/user.entity";
import {UserRole} from "../../../models/role.entity";

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
