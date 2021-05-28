import User from "../../user/user.entity";

export interface LoginReq {
    username: string;
    password: string;
}

export interface LoginRes {
    user: User;
    accessToken: string;
    refreshToken: string;
}
