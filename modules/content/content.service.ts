import NetworkManager from "../../services/http/network-manager";
import {ContentSection} from "../../models/content";
import {URLPath} from "../../services/http/URLPath";
import CourseService from "../course/course.service";

export default class ContentService extends NetworkManager {
    courseService = new CourseService();

    async getCourse(courseId: number) {
        return this.courseService.getCourse(courseId);
    }

    async getContent(courseId: number, contentId: number) {
        return await this.instance.get<ContentSection>(URLPath.content.byId(courseId, contentId));
    }

}
