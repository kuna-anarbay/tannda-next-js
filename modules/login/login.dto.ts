import User from "../user/user.entity";
import {UserRole} from "../../models/role";

export interface LoginRequestDto {
    username: string;
    password: string;
}

export interface LoginResponseDto {
    user: User;
    accessToken: string;
    refreshToken: string;
    role?: UserRole;
}