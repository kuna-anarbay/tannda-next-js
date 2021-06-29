import NetworkManager from "../../services/http/network-manager";
import {CreateLessonRequestDto} from "./new-lesson.dto";
import {Content} from "../../models/content";
import {URLPath} from "../../services/http/URLPath";
import {Resource} from "../../models/resource";

export default class NewLessonService extends NetworkManager {

    createLesson = async (courseId: number, body: CreateLessonRequestDto) => {
        return await this.instance.post<Content>(URLPath.content.lesson(courseId), body);
    }

    async uploadFiles(courseId: number, contentId: number, files: File[]) {
        const formData = new FormData();
        files.forEach(file => {
            formData.append("files", file);
        });

        return await this.multipart.post<Resource[]>(URLPath.content.upload(courseId, contentId), formData);
    }

}
