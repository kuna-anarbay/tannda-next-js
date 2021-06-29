import NetworkManager from "../../services/network-manager";
import {MemberEntity, MemberRole, MemberStatus} from "../../models/member.entity";
import {URLPath} from "../../services/URLPath";
import {UpdateMemberStatusRequestDTO} from "./course-members.dto";

export default class CourseMembersService extends NetworkManager {

    getMembers = async (courseId: number, role?: MemberRole, status?: MemberStatus) => {
        return this.instance.get<MemberEntity[]>(URLPath.member.base(courseId), {
            params: {role, status}
        });
    }


    updateMemberStatus = async (courseId: number, userId: number, body: UpdateMemberStatusRequestDTO) => {
        return await this.instance.put<string>(URLPath.member.member(courseId, userId), body);
    }


    deleteMember = async (courseId: number, userId: number) => {
        return await this.instance.delete<string>(URLPath.member.member(courseId, userId));
    }

}
