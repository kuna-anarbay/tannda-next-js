import NetworkManager from "../../services/network-manager";
import SubmissionService from "../submission/submission.service";
import {Question} from "../../models/question.entity";

export default class ContentInfoService extends NetworkManager {
    submissionService = new SubmissionService();

    startSubmission = async (courseId: number, relationId: number): Promise<Question[]> => {
        return this.submissionService.startSubmission(courseId, relationId);
    }

}
