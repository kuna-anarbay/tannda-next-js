import NetworkManager from "./http/network-manager";
import {AddContentReq, AddLessonReq, Content, ContentSection, ContentStatus, UpdateContentReq} from "../models/content";
import {URLPath} from "./http/URLPath";
import {SectionData} from "../models/section";
import {Resource} from "../models/resource";
import {ContentMember} from "../models/content-member";

export default class ContentService extends NetworkManager {

    public constructor() {
        super();
    }

    async getContents(courseId: number) {
        return await this.instance.get<SectionData>(URLPath.content.base(courseId));
    }


    async createLesson(courseId: number, body: AddLessonReq) {
        return await this.instance.post<Content>(URLPath.content.lesson(courseId), body);
    }

    async createContent(courseId: number, body: AddContentReq) {
        return await this.instance.post<Content>(URLPath.content.base(courseId), body);
    }

    async uploadFiles(courseId: number, contentId: number, files: File[]) {
        const formData = new FormData();
        files.forEach(file => {
            formData.append("files", file);
        });

        return await this.multipart.post<Resource[]>(URLPath.content.upload(courseId, contentId), formData);
    }

    async getContent(id: number, courseId: number) {
        return await this.instance.get<ContentSection>(URLPath.content.byId(courseId, id));
    }

    async updateStatus(courseId: number, contentId: number, status: ContentStatus, ids: number[]) {
        return await this.instance.put<string>(URLPath.content.status(courseId, contentId), {status, ids});
    }

    async deleteContent(courseId: number, contentId: number) {
        return await this.instance.delete<string>(URLPath.content.byId(courseId, contentId));
    }


    async deleteFiles(courseId: number, contentId: number, ids: number[]) {
        return await this.instance.delete<string>(URLPath.content.upload(courseId, contentId), {
            params: {ids}
        });
    }

    async updateContent(courseId: number, contentId: number, body: UpdateContentReq) {
        return await this.instance.put<Content>(URLPath.content.byId(courseId, contentId), body);
    }


    async getContentMembers(courseId: number, contentId: number) {
        return await this.instance.get<ContentMember[]>(URLPath.content.members(courseId, contentId));
    }




}
