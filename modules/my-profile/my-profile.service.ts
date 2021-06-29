import NetworkManager from "../../services/network-manager";
import {URLPath} from "../../services/URLPath";
import {UpdateProfileRequestDto} from "./my-profile.dto";
import User from "../../models/user.entity";

export default class MyProfileService extends NetworkManager {

    getMyProfile = async () => {
        return await this.instance.get<User>(URLPath.profile.me);
    }

    async updateProfile(body: UpdateProfileRequestDto) {
        return await this.instance.put<string>(URLPath.profile.me, body)
    }

    async updateAvatar(file: File) {
        const formData = new FormData();
        formData.append("file", file);
        return await this.multipart.put<string>(URLPath.profile.avatar, formData, {
            onUploadProgress: progressEvent => console.log(progressEvent.loaded)
        });
    }

}
