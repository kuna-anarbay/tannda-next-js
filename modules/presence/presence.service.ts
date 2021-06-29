import NetworkManager from "../../services/http/network-manager";
import {Member} from "../../models/member";
import {URLPath} from "../../services/http/URLPath";
import {PresenceRequestDto} from "./presence.dto";

export default class PresenceService extends NetworkManager {


    public constructor() {
        super();
    }

    async getPresence(courseId: number) {
        return await this.instance.get<Member[]>(URLPath.presence.base(courseId));
    }

    async postPresence(courseId: number, body: PresenceRequestDto) {
        return await this.instance.post<string>(URLPath.presence.base(courseId), body);
    }

}
