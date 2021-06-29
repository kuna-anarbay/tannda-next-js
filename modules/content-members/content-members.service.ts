import NetworkManager from "../../services/network-manager";
import {ContentMember} from "../../models/content-member.entity";
import {URLPath} from "../../services/URLPath";
import CourseMembersService from "../course-members/course-members.service";
import {ContentStatusRequestDto} from "./content-members.dto";
import {MemberRole, MemberStatus} from "../../models/member.entity";
import PresenceService from "../presence/presence.service";
import {PresenceRequestDto} from "../presence/presence.dto";
import {SubmissionRequestDto} from "../submission/submission.dto";
import SubmissionService from "../submission/submission.service";

export default class ContentMembersService extends NetworkManager {

    courseMembersService = new CourseMembersService();
    presenceService = new PresenceService();
    submissionService = new SubmissionService();


    updateSubmission = async (courseId: number, body: SubmissionRequestDto) => {
        return this.submissionService.createSubmission(courseId, body);
    }

    updatePresence = async (courseId: number, body: PresenceRequestDto) => {
        return this.presenceService.postPresence(courseId, body);
    }

    async getCourseMembers(courseId: number) {
        return await this.courseMembersService.getMembers(courseId, MemberRole.STUDENT, MemberStatus.ACTIVE);
    }

    async getContentMembers(courseId: number, contentId: number) {
        return await this.instance.get<ContentMember[]>(URLPath.content.members(courseId, contentId));
    }

    async updateStatus(courseId: number, contentId: number, body: ContentStatusRequestDto) {
        return await this.instance.put<string>(URLPath.content.status(courseId, contentId), body);
    }

}
