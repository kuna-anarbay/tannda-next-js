import NetworkManager from "./http/network-manager";
import Course, {CourseRes} from "../models/course";
import {URLPath} from "./http/URLPath";
import {CourseReq} from "./dto/course.dto";
import {AddMemberDto, Member, MemberStatus} from "../models/member";

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

    getCourse = async (id: number) => {
        return await this.instance.get<CourseRes>(URLPath.course.byId(id))
    }

    createCourse = async (body: CourseReq) => {
        return await this.instance.post<Course>(URLPath.course.base, body);
    }

}
