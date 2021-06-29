import NetworkManager from "../../services/network-manager";
import Course from "../../models/course";
import {URLPath} from "../../services/URLPath";

export default class CourseService extends NetworkManager {

    getCourse = (courseId: number) => {
        return this.instance.get<Course>(URLPath.course.byId(courseId));
    }

}
