import NetworkManager from "./http/network-manager";
import {AddMemberDto, Member, MemberStatus} from "../models/member";
import {URLPath} from "./http/URLPath";

export default class MemberService extends NetworkManager {

    public constructor() {
        super();
    }

    getMembers = async (id: number) => {
        return await this.instance.get<Member[]>(URLPath.course.members(id))
    }


    addMember = async (id: number, body: AddMemberDto) => {
        return await this.instance.post<string>(URLPath.course.members(id), body);
    }


    getMember = async (courseId: number, userId: number) => {
        return await this.instance.get<Member>(URLPath.member.member(courseId, userId));
    }


    archiveMember = async (courseId: number, userId: number) => {
        return await this.instance.put<string>(URLPath.member.member(courseId, userId), {
            status: MemberStatus.ARCHIVED
        })
    }


    respondToInvitation = async (courseId: number, response: MemberStatus.REJECTED | MemberStatus.ACTIVE) => {
        return await this.instance.put<string>(URLPath.member.base(courseId), {
            status: response
        })
    }

}
