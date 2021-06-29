import NetworkManager from "../../services/network-manager";
import {ContentSection} from "../../models/content.entity";
import {URLPath} from "../../services/URLPath";
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
