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

}