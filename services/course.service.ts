import NetworkManager from "./http/network-manager";
import Course from "../models/course";
import {URLPath} from "./http/URLPath";
import {CourseReq} from "./dto/course.dto";
import {MemberStatus} from "../models/member";

export default class CourseService extends NetworkManager {

    public constructor() {
        super();
    }


    getCourses = async (memberStatus?: MemberStatus) => {
        return await this.instance.get<Course[]>(URLPath.course.base, {
            params: {
                memberStatus: memberStatus
            }
        });
    }


    createCourse = async (body: CourseReq) => {
        return await this.instance.post<Course>(URLPath.course.base, body);
    }


    editCourse = async (courseId: number, body: CourseReq) => {
        return await this.instance.put<Course>(URLPath.course.byId(courseId), body);
    }

}
