import NetworkManager from "./http/axios";
import Course from "../modules/courses/course.entity";
import {URLPath} from "./http/URLPath";

export default class CourseService extends NetworkManager {

    public constructor() {
        super();
    }

    getCourses = async () => {
        return await this.instance.get<Course[]>(URLPath.course.base);
    }

}
