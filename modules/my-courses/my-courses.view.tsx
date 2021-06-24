import Course from "../../models/course";
import PageHeader from "../util/page-header";
import {isManager, UserRole} from "../../models/role";
import {MemberStatus} from "../../models/member";
import CourseCard from "./course.card";
import Spinner from "../util/spinner.component";

interface MyCoursesViewProps {
    loading: boolean;
    role: UserRole;
    activeCourses: Course[];
    pendingCourses: Course[];
    createNewCourse: () => void;
    openCourse: (course: Course) => void;
    respondToInvitation: (course: Course, status: MemberStatus) => void;
}

export default function MyCoursesView(props: MyCoursesViewProps) {
    const {role, loading, activeCourses, pendingCourses, respondToInvitation, createNewCourse, openCourse} = props;

    return (
        <div className={"container mx-auto px-4 md:px-0"}>
            <div className={"grid grid-cols-1 md:grid-cols-7 gap-x-8"}>
                <div className={"md:col-span-5"}>
                    <PageHeader title={"Курсы"}
                                buttonTitle={isManager(role) ? "Новый курс" : null}
                                handleClick={createNewCourse}
                                items={[]}/>
                </div>
                <div/>
                <div className={"md:col-span-5"}>
                    {loading ? <Spinner/> : null}
                    <div className={"grid grid-cols-1 md:grid-cols-2 md:gap-6"}>
                        {activeCourses.map(course => (
                            <CourseCard key={course.id} course={course} openCourse={openCourse}/>
                        ))}
                        {pendingCourses.map(course => (
                            <CourseCard key={course.id} respondToInvitation={respondToInvitation} course={course}
                                        openCourse={openCourse}/>
                        ))}
                    </div>
                </div>
                <div
                    className={"py-4 px-6 md:col-span-2 rounded-md border border-border bg-background-secondary mt-4 md:mt-0"}>
                    <h6 className={"font-semibold"}>
                        Цитата дня
                    </h6>
                    <p className={"text-footnote text-label-secondary mt-1.5"}>
                        За свою карьеру я пропустил более 9000 бросков, проиграл почти 300 игр. 26 раз мне доверяли
                        сделать финальный победный бросок, и я промахивался. Я терпел поражения снова, и снова, и снова.
                        И именно поэтому я добился успеха.
                    </p>
                    <p className={"text-footnote font-medium text-primary mt-1"}>
                        Майкл Джордан
                    </p>
                </div>
            </div>
        </div>
    )
}
