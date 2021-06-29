import NetworkManager from "../../services/network-manager";
import {SubmissionRequestDto, SubmitRequestDto} from "./submission.dto";
import {URLPath} from "../../services/URLPath";
import {Question} from "../../models/question.entity";

export default class SubmissionService extends NetworkManager {

    createSubmission = async (courseId: number, body: SubmissionRequestDto): Promise<void> => {
        return await this.instance.post<void>(URLPath.submission.base(courseId), body);
    }

    startSubmission = async (courseId: number, relationId: number): Promise<Question[]> => {
        return await this.instance.get<Question[]>(URLPath.submission.byId(courseId, relationId));
    }

    submitAnswers = async (courseId: number, relationId: number, body: SubmitRequestDto): Promise<void> => {
        return await this.instance.post<void>(URLPath.submission.byId(courseId, relationId), body);
    }

}
