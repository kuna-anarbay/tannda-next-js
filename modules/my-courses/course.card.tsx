import Course from "../../models/course";
import {getRoleName, MemberStatus} from "../../models/member";

interface CourseCardProps {
    course: Course;
    openCourse: (course: Course) => void;
    respondToInvitation?: (course: Course, status: MemberStatus.ACTIVE | MemberStatus.REJECTED) => void
}

export default function CourseCard(props: CourseCardProps) {
    const {course, respondToInvitation, openCourse} = props;

    return (
        <div
            onClick={() => openCourse(course)}
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
            {respondToInvitation ? (
                <div className={"py-2  mt-3 bg-muted border-t border-border space-y-2"}>
                    <p className={"text-footnote text-label"}>
                        Вы приглашены на этот курс как <a
                        className={"text-primary font-medium"}>{getRoleName(course.member.role)}</a>
                    </p>
                    <div className={"flex space-x-2"}>
                        <button onClick={() => respondToInvitation(course, MemberStatus.ACTIVE)}
                                className={"btn btn-sm btn-primary w-full"}>
                            Принять
                        </button>
                        <button onClick={() => respondToInvitation(course, MemberStatus.REJECTED)}
                                className={"btn btn-sm btn-danger w-full"}>
                            Отклонить
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
