import {IsEnum} from "class-validator";
import {MemberStatus} from "../../models/member.entity";

export class UserResponseRequestDto {

    @IsEnum(MemberStatus)
    status: MemberStatus;

}
