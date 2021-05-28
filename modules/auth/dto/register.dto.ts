import User from "../../user/user.entity";

export interface RegisterReq {
    firstName: string;
    lastName?: string;
    phone: string;
    code: string;
    device?: string;
    password: string;
}

export interface RegisterRes {
    user: User;
    accessToken: string;
    refreshToken: string;
}
