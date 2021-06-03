import NetworkManager from "./http/axios";
import {Member} from "../models/member";
import {URLPath} from "./http/URLPath";

export default class MemberService extends NetworkManager {

    public constructor() {
        super();
    }


    getMember = async (courseId: number, userId: number) => {
        return await this.instance.get<Member>(URLPath.member.member(courseId, userId));
    }

}
