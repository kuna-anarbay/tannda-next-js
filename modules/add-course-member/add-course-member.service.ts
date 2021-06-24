import NetworkManager from "../../services/http/network-manager";
import {AddCourseMemberRequestDto} from "./add-course-member.dto";
import {URLPath} from "../../services/http/URLPath";

export class AddCourseMemberService extends NetworkManager {

    addCourseMember = async (courseId: number, body: AddCourseMemberRequestDto) => {
        return await this.instance.post<string>(URLPath.member.base(courseId), body);
    }

}