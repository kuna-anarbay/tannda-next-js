import NetworkManager from "../../services/http/network-manager";
import {SectionData} from "../../models/section";
import {URLPath} from "../../services/http/URLPath";

export default class ContentDataService extends NetworkManager {

    async getContentData(courseId: number) {
        return await this.instance.get<SectionData>(URLPath.content.base(courseId));
    }

}