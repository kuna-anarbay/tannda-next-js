import NetworkManager from "./http/network-manager";
import {URLPath} from "./http/URLPath";

export default class ProfileService extends NetworkManager {


    public constructor() {
        super();
    }

    async updateProfile(firstName: string, lastName: string) {
        return await this.instance.put<string>(URLPath.profile.me, {firstName, lastName})
    }

    async updateAvatar(file) {
        let formData = new FormData();
        formData.append("file", file);
        return await this.multipart.put<string>(URLPath.profile.avatar, formData);
    }

}
