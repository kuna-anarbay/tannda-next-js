import NetworkManager from "../../services/http/network-manager";
import {Member, MemberStatus} from "../../models/member";
import {URLPath} from "../../services/http/URLPath";
import {UpdateMemberStatusRequestDTO} from "./course-members.dto";

export default class CourseMembersService extends NetworkManager {

    getMembers = async (courseId: number) => {
        return this.instance.get<Member[]>(URLPath.member.base(courseId));
    }


    updateMemberStatus = async (courseId: number, userId: number, body: UpdateMemberStatusRequestDTO) => {
        return await this.instance.put<string>(URLPath.member.member(courseId, userId), body);
    }


    deleteMember = async (courseId: number, userId: number) => {
        return await this.instance.delete<string>(URLPath.member.member(courseId, userId));
    }

}