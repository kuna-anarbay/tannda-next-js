import NetworkManager from "./http/network-manager";
import {Member} from "../models/member";
import {URLPath} from "./http/URLPath";
import {PresenceReq} from "../models/presence";

export default class PresenceService extends NetworkManager {


    public constructor() {
        super();
    }

    async getPresence(courseId: number) {
        return await this.instance.get<Member[]>(URLPath.presence.base(courseId));
    }

    async postPresence(courseId: number, body: PresenceReq) {
        return await this.instance.post<string>(URLPath.presence.base(courseId), body);
    }

}
