import NetworkManager from "../../services/http/network-manager";
import {NewCourseRequestDto} from "./new-course.dto";
import Course from "../../models/course";
import {URLPath} from "../../services/http/URLPath";

export default class NewCourseService extends NetworkManager {

    createCourse = async (body: NewCourseRequestDto) => {
        return await this.instance.post<Course[]>(URLPath.course.base, body);
    }

}
