import NetworkManager from "../../services/network-manager";
import {URLPath} from "../../services/URLPath";
import {ReorderContentRequestDto} from "./contents.dto";

export default class ContentsService extends NetworkManager {

    reorder = async (courseId: number, contentId: number, body: ReorderContentRequestDto) => {
        return await this.instance.put<string>(URLPath.content.reorder(courseId, contentId), body);
    }

}
