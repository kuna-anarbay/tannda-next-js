import NetworkManager from "../../services/network-manager";
import {CreateExamRequestDto} from "./new-exam.dto";
import {Content} from "../../models/content.entity";
import {URLPath} from "../../services/URLPath";
import {Resource} from "../../models/resource.entity";

export default class NewExamService extends NetworkManager {

    createExam = async (courseId: number, body: CreateExamRequestDto) => {
        return await this.instance.post<Content>(URLPath.content.exam(courseId), body);
    }

    async uploadFiles(courseId: number, contentId: number, files: File[]) {
        const formData = new FormData();
        files.forEach(file => {
            formData.append("files", file);
        });

        return await this.multipart.post<Resource[]>(URLPath.content.upload(courseId, contentId), formData);
    }

}
