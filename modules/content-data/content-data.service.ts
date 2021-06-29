import NetworkManager from "../../services/network-manager";
import {SectionData} from "../../models/section";
import {URLPath} from "../../services/URLPath";

export default class ContentDataService extends NetworkManager {

    async getContentData(courseId: number) {
        return await this.instance.get<SectionData>(URLPath.content.base(courseId));
    }

}
