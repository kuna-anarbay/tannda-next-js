import NetworkManager from "../../services/network-manager";
import {AddCourseMemberRequestDto} from "./add-course-member.dto";
import {URLPath} from "../../services/URLPath";

export class AddCourseMemberService extends NetworkManager {

    addCourseMember = async (courseId: number, body: AddCourseMemberRequestDto): Promise<string> => {
        return await this.instance.post<string>(URLPath.member.base(courseId), body);
    }

}
