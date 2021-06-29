import {Content} from "../../models/content";
import ResourceCell from "../resources/resource.cell";
import {presenceStatusName} from "../../models/presence";
import {getDate} from "../util/date";
import {Question} from "../../models/question";
import SubmissionController from "../submission/submission.controller";

interface ContentInfoViewProps {
    relationId: number;
    courseId: number;
    content: Content;
    getSubmission: () => void;
    questions: Question[];
}

export default function ContentInfoView(props: ContentInfoViewProps) {
    const {content, getSubmission, questions, courseId, relationId} = props;

    return (
        <div className={"py-6 space-y-4"}>
            <div className={"space-y-2"}>
                <div className={"space-y-1"}>
                    <div className={"flex items-center space-x-3 justify-between"}>
                        <h3 className={"font-semibold flex-grow hover:text-primary text-title3"}>
                            {content.title}
                        </h3>
                    </div>
                    <a className={"py-0.5 px-1.5 bg-background-secondary rounded-1 text-caption2 uppercase"}>
                        {content.type}
                    </a>
                    <p className={"text-subheadline text-label"}>
                        {content.description}
                    </p>
                </div>
                <div className={"space-y-1.5"}>
                    {content.resources.map(resource => (
                        <ResourceCell resource={resource}/>
                    ))}
                </div>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
                <div className={"py-2 px-4 rounded-1.5 bg-background-secondary"}>
                    <h5 className={"text-caption1 uppercase text-label-secondary"}>Presence</h5>
                    <p className={"font-medium"}>
                        {presenceStatusName(content.presence?.status)}
                    </p>
                    <p className={"text-footnote"}>
                        {getDate(content?.presence?.updatedAt, "D MMM, HH:mm")} • {content?.presence?.note}
                    </p>
                </div>
                <div className={"py-2 px-4 rounded-1.5 bg-background-secondary"}>
                    <h5 className={"text-caption1 uppercase text-label-secondary"}>Grade</h5>
                    <p className={"font-medium"}>
                        {content.grade?.points} points
                    </p>
                    <p className={"text-footnote"}>
                        {getDate(content?.grade?.updatedAt, "D MMM, HH:mm")} • {content?.grade?.note}
                    </p>
                </div>
                <div className={"py-2 px-4 rounded-1.5 bg-background-secondary"}>
                    <h5 className={"text-caption1 uppercase text-label-secondary"}>Submission</h5>
                    <p className={"font-medium"}>
                        {getDate(content?.submission?.submittedAt, "D MMM, HH:mm")}
                    </p>
                    <p className={"text-footnote"}>
                        {getDate(content?.submission?.availableFrom, "D MMM, HH:mm")} - {getDate(content?.submission?.availableTo, "D MMM, HH:mm")}
                    </p>
                </div>
            </div>
            <div>
                <button onClick={getSubmission} className={"btn btn-outline"}>
                    Start quiz
                </button>
            </div>
            <div>
                <SubmissionController questions={questions} courseId={courseId} relationId={relationId}/>
            </div>
        </div>
    )
}
