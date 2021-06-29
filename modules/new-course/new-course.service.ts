import NetworkManager from "../../services/network-manager";
import {NewCourseRequestDto} from "./new-course.dto";
import Course from "../../models/course.entity";
import {URLPath} from "../../services/URLPath";

export default class NewCourseService extends NetworkManager {

    createCourse = async (body: NewCourseRequestDto) => {
        return await this.instance.post<Course[]>(URLPath.course.base, body);
    }

}
