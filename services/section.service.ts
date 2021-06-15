import NetworkManager from "./http/network-manager";
import Section from "../models/section";
import {URLPath} from "./http/URLPath";
import {CreateSectionDto} from "./dto/section.dto";

export default class SectionService extends NetworkManager {

    public constructor() {
        super();
    }

    createSection = async (courseId: number, body: CreateSectionDto) => {
        return await this.instance.post<Section>(URLPath.section.base(courseId), body);
    }


    updateSection = async (courseId: number, sectionId: number, body: CreateSectionDto) => {
        return await this.instance.put<Section>(URLPath.section.byId(courseId, sectionId), body);
    }


    reorder = async (courseId: number, sectionId: number, index: number) => {
        return await this.instance.put<string>(URLPath.section.reorder(courseId, sectionId), {index});
    }


    deleteSection = async (courseId: number, sectionId: number) => {
        return await this.instance.delete<string>(URLPath.section.byId(courseId, sectionId));
    }

}
