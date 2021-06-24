import NetworkManager from "../../services/http/network-manager";
import Course from "../../models/course";
import {URLPath} from "../../services/http/URLPath";

export default class CourseService extends NetworkManager {

    getCourse = (courseId: number) => {
        return this.instance.get<Course>(URLPath.course.byId(courseId));
    }

}
