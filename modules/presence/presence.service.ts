import NetworkManager from "../../services/network-manager";
import {MemberEntity} from "../../models/member.entity";
import {URLPath} from "../../services/URLPath";
import {PresenceRequestDto} from "./presence.dto";

export default class PresenceService extends NetworkManager {


    public constructor() {
        super();
    }

    async getPresence(courseId: number) {
        return await this.instance.get<MemberEntity[]>(URLPath.presence.base(courseId));
    }

    async postPresence(courseId: number, body: PresenceRequestDto) {
        return await this.instance.post<string>(URLPath.presence.base(courseId), body);
    }

}
