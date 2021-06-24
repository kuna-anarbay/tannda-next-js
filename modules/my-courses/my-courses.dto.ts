import {IsEnum} from "class-validator";
import {MemberStatus} from "../../models/member";

export class UserResponseRequestDto {

    @IsEnum(MemberStatus)
    status: MemberStatus;

}
