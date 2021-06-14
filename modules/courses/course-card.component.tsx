import Link from "next/link";
import Course from "../../models/course";
import {getRoleName, MemberStatus} from "../../models/member";
import {useState} from "react";
import MemberService from "../../services/member.service";
import {useAppData} from "../app/app-data-provider";
import Spinner from "../util/spinner.component";

interface CourseCardComponentProps {
    course: Course;
    statusUpdated?: (course: Course, status: MemberStatus) => void;
}

export default function CourseCardComponent(props: CourseCardComponentProps) {
    const {course, statusUpdated} = props;
    const [loading, setLoading] = useState(false);
    const memberService = new MemberService();
    const {showSuccess, showError} = useAppData();

    const respondToInvitation = async (status: MemberStatus.ACTIVE | MemberStatus.REJECTED) => {
        setLoading(true);
        try {
            const message = await memberService.respondToInvitation(course.id, status);
            setLoading(false);
            showSuccess(message);
            statusUpdated(course, status);
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    }

    return (
        <Link href={`/courses/${course.id}`}>
            <div
                className={"px-4 py-3 shadow-card cursor-pointer rounded-md md:rounded-lg hover:bg-muted md:hover:bg-background hover:text-primary"}>
                <div
                    className={"space-y-1"}>
                    <div>
                        <h3 className={"text-base font-medium md:text-title3 md:font-semibold"}>
                            {course.title}
                        </h3>
                    </div>
                    <p className={"text-footnote text-label-light"}>
                        {course.description.substring(0, 200)}
                    </p>
                </div>
                {course.member && course.member.status === MemberStatus.PENDING ? (
                    <div className={"py-2 px-3 mt-3 bg-muted border border-divider-light rounded-1.5 space-y-2"}>
                        <p className={"text-footnote"}>
                            Вы приглашены на этот курс как <a
                            className={"text-primary font-medium"}>{getRoleName(course.member.role)}</a>
                        </p>
                        {loading ? <Spinner size={"small"}/> : (
                            <div className={"flex space-x-2"}>
                                <button disabled={loading} onClick={() => respondToInvitation(MemberStatus.ACTIVE)}
                                        className={"btn btn-sm btn-primary w-full"}>
                                    Принять
                                </button>
                                <button disabled={loading} onClick={() => respondToInvitation(MemberStatus.REJECTED)}
                                        className={"btn btn-sm btn-danger w-full"}>
                                    Отклонить
                                </button>
                            </div>
                        )}
                    </div>
                ) : null}
            </div>
        </Link>
    )
}
