import NetworkManager from "../../services/network-manager";
import {URLPath} from "../../services/URLPath";
import {ReorderSectionRequestDto} from "./sections.dto";
import {AxiosResponse} from "axios";

export default class SectionsService extends NetworkManager {

    reorder = async (courseId: number, sectionId: number, body: ReorderSectionRequestDto): Promise<AxiosResponse> => {
        return await this.instance.put<string>(URLPath.section.reorder(courseId, sectionId), body);
    }

}
