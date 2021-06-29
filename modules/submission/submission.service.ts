import NetworkManager from "../../services/http/network-manager";
import {SubmissionRequestDto, SubmitRequestDto} from "./submission.dto";
import {URLPath} from "../../services/http/URLPath";
import {Question} from "../../models/question";

export default class SubmissionService extends NetworkManager {

    createSubmission = async (courseId: number, body: SubmissionRequestDto) => {
        return await this.instance.post<void>(URLPath.submission.base(courseId), body);
    }

    startSubmission = async (courseId: number, relationId: number) => {
        return await this.instance.get<Question[]>(URLPath.submission.byId(courseId, relationId));
    }

    submitAnswers = async (courseId: number, relationId: number, body: SubmitRequestDto) => {
        return await this.instance.post<void>(URLPath.submission.byId(courseId, relationId), body);
    }

}
