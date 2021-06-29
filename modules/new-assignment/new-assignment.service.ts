import NetworkManager from "../../services/network-manager";
import {CreateAssignmentRequestDto} from "./new-assignment.dto";
import {Content} from "../../models/content";
import {URLPath} from "../../services/URLPath";
import {Resource} from "../../models/resource";

export default class NewAssignmentService extends NetworkManager {

    createAssignment = async (courseId: number, body: CreateAssignmentRequestDto) => {
        return await this.instance.post<Content>(URLPath.content.assignment(courseId), body);
    }

    async uploadFiles(courseId: number, contentId: number, files: File[]) {
        const formData = new FormData();
        files.forEach(file => {
            formData.append("files", file);
        });

        return await this.multipart.post<Resource[]>(URLPath.content.upload(courseId, contentId), formData);
    }

}
