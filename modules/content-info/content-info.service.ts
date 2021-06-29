import NetworkManager from "../../services/http/network-manager";
import SubmissionService from "../submission/submission.service";

export default class ContentInfoService extends NetworkManager {
    submissionService = new SubmissionService();

    startSubmission = async (courseId: number, relationId: number) => {
        return this.submissionService.startSubmission(courseId, relationId);
    }

}
