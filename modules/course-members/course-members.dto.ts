import {MemberStatus} from "../../models/member";

export class UpdateMemberStatusRequestDTO {
    status: MemberStatus.ARCHIVED | MemberStatus.ACTIVE;
}