import NetworkManager from "./http/axios";
import Course from "../modules/courses/course.entity";
import {URLPath} from "./http/URLPath";
import {CourseReq} from "./dto/course.dto";
import {AddMemberDto, Member} from "../models/member";

export default class CourseService extends NetworkManager {

    public constructor() {
        super();
    }

    getCourses = async () => {
        return await this.instance.get<Course[]>(URLPath.course.base);
    }

    getCourse = async (id: number) => {
        return await this.instance.get<Course>(URLPath.course.byId(id))
    }

    getMembers = async (id: number) => {
        return await this.instance.get<Member[]>(URLPath.course.members(id))
    }

    addMember = async (id: number, body: AddMemberDto) => {
        return await this.instance.post<Member>(URLPath.course.members(id), body);
    }

    createCourse = async (body: CourseReq) => {
        return await this.instance.post<Course>(URLPath.course.base, body);
    }

}
