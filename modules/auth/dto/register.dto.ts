import User from "../../../models/user.entity";

export interface RegisterReq {
    firstName: string;
    lastName?: string;
    phone: string;
    code: string;
    password: string;
}

export interface RegisterRes {
    user: User;
    accessToken: string;
    refreshToken: string;
}
