import {MemberRole} from "../../models/member";
import {IsEnum, IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";

export class AddCourseMemberRequestDto {

    @IsString()
    @IsPhoneNumber('KZ')
    phone: string;

    @IsNotEmpty()
    @IsEnum(MemberRole)
    role: MemberRole;Ò

}