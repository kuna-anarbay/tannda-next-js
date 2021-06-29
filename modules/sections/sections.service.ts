import NetworkManager from "../../services/network-manager";
import {URLPath} from "../../services/URLPath";
import {ReorderSectionRequestDto} from "./sections.dto";

export default class SectionsService extends NetworkManager {

    reorder = async (courseId: number, sectionId: number, body: ReorderSectionRequestDto) => {
        return await this.instance.put<string>(URLPath.section.reorder(courseId, sectionId), body);
    }

}
