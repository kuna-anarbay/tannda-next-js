import NetworkManager from "../../services/network-manager";
import Section from "../../models/section";
import {URLPath} from "../../services/URLPath";
import {EditSectionRequestDto} from "./edit-section.dto";

export default class EditSectionService extends NetworkManager {

    createSection = async (courseId: number, body: EditSectionRequestDto) => {
        return await this.instance.post<Section>(URLPath.section.base(courseId), body);
    }


    updateSection = async (courseId: number, sectionId: number, body: EditSectionRequestDto) => {
        return await this.instance.put<Section>(URLPath.section.byId(courseId, sectionId), body);
    }


    deleteSection = async (courseId: number, sectionId: number) => {
        return await this.instance.delete<string>(URLPath.section.byId(courseId, sectionId));
    }

}
