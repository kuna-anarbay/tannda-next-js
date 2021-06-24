import NetworkManager from "../../services/http/network-manager";
import Course from "../../models/course";
import {URLPath} from "../../services/http/URLPath";
import {MemberStatus} from "../../models/member";
import {UserResponseRequestDto} from "./my-courses.dto";

export default class MyCoursesService extends NetworkManager {

    getActiveCourses = async () => {
        return await this.instance.get<Course[]>(URLPath.course.my);
    }


    getPendingCourses = async () => {
        return await this.instance.get<Course[]>(URLPath.course.my, {
            params: {
                memberStatus: MemberStatus.PENDING
            }
        });
    }


    respondToInvitation = async (courseId: number, body: UserResponseRequestDto) => {
        return await this.instance.put<string>(URLPath.member.base(courseId), body);
    }

}
