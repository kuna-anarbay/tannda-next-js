import User from "../user/user.entity";
import {UserRole} from "../../models/role";
import {IsPhoneNumber, Matches} from "class-validator";
import {strings} from "../util/strings";

export class LoginRequestDto {

    @IsPhoneNumber("KZ", {
        message: strings.invalidPhoneNumber
    })
    readonly username: string;


    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,30}).*$/, {
        message: strings.invalidPassword
    })
    readonly password: string;


    constructor(values) {
        this.username = values.username;
        this.password = values.password;
    }
}

export interface LoginResponseDto {
    readonly user: User;
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly role?: UserRole;
}
