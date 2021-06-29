import {MemberStatus} from "../../models/member.entity";

export class UpdateMemberStatusRequestDTO {
    status: MemberStatus.ARCHIVED | MemberStatus.ACTIVE;
}
