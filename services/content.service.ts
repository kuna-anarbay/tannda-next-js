import NetworkManager from "./http/network-manager";
import {AddContentReq, Content, ContentStatus} from "../models/content";
import {URLPath} from "./http/URLPath";
import {SectionData} from "../models/section";

export default class ContentService extends NetworkManager {

    public constructor() {
        super();
    }

    async getContents(courseId: number) {
        return await this.instance.get<SectionData>(URLPath.content.base(courseId));
    }


    async createContent(courseId: number, body: AddContentReq) {
        return await this.instance.post<Content>(URLPath.content.base(courseId), body);
    }

    async uploadFiles(courseId: number, contentId: number, files: File[], progressHandler?: (number) => void) {
        const formData = new FormData();
        files.forEach(file => {
            formData.append("files", file);
        });

        return await this.multipart.post<Content>(URLPath.content.upload(courseId, contentId), formData, {
            onUploadProgress: (progressEvent => {
                progressHandler((progressEvent.loaded / progressEvent.total) * 100);
            })
        });
    }

    async updateStatus(courseId: number, contentId: number, status: ContentStatus) {
        return await this.instance.put<string>(URLPath.content.status(courseId, contentId), {status});
    }


}
