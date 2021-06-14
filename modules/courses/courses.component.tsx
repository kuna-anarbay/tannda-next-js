import CourseService from "../../services/course.service";
import {useEffect, useState} from "react";
import Course from "../../models/course";
import CourseCardComponent from "./course-card.component";
import Spinner from "../util/spinner.component";
import {MemberStatus} from "../../models/member";
import {useAppData} from "../app/app-data-provider";
import {isManager} from "../../models/role";
import PageHeader from "../util/page-header";
import {useRouter} from "next/router";

class Response<T> {
    loading: boolean = false;
    data?: T = undefined;
}


export default function CoursesComponent() {
    const {showError, role} = useAppData();
    const [{loading, data: courses}, setCourses] = useState(new Response<Course[]>());
    const [{data: pendingCourses}, setPendingCourses] = useState(new Response<Course[]>());
    const {push} = useRouter();
    const courseService = new CourseService();

    useEffect(() => {
        getCourses();
        getPendingCourses();
    }, [])

    const getCourses = async () => {
        setCourses({loading: true});
        try {
            const data = await courseService.getCourses();
            setCourses({loading: false, data: data});
        } catch (err) {
            showError(err.message);
            setCourses({loading: false});
        }
    }

    const getPendingCourses = async () => {
        setPendingCourses({loading: true});
        try {
            const data = await courseService.getCourses(MemberStatus.PENDING);
            setPendingCourses({loading: false, data: data});
        } catch (err) {
            showError(err.message);
            setPendingCourses({loading: false});
        }
    }


    const statusUpdated = (course: Course, status: MemberStatus) => {
        course.member.status = status;
        setPendingCourses({loading: false, data: pendingCourses.filter(c => c.id !== course.id)});
        if (status === MemberStatus.ACTIVE) {
            setCourses({loading: false, data: [...courses, course]})
        }
    }


    return (
        <div className={"container mx-auto px-4 md:px-0"}>
            <div className={"grid grid-cols-1 md:grid-cols-7 gap-x-8"}>
                <div className={"md:col-span-5"}>
                    <PageHeader title={"Курсы"}
                                buttonTitle={isManager(role) ? "Новый курс" : null}
                                handleClick={() => push("/courses/new")}
                                items={[]}/>
                </div>
                <div />
                <div className={"md:col-span-5"}>
                    {loading ? <Spinner/> : null}
                    <div className={"grid grid-cols-1 md:grid-cols-2 md:gap-6"}>
                        {courses ? courses.map(course => (
                            <CourseCardComponent key={course.id} course={course}/>
                        )) : null}
                        {pendingCourses ? pendingCourses.map(course => (
                            <CourseCardComponent key={course.id} statusUpdated={statusUpdated} course={course}/>
                        )) : null}
                    </div>
                </div>
                <div className={"py-4 px-6 md:col-span-2 rounded-md border border-border bg-background-secondary mt-4 md:mt-0"}>
                    <h6 className={"font-semibold"}>
                        Цитата дня
                    </h6>
                    <p className={"text-footnote text-label-secondary mt-1.5"}>
                        За свою карьеру я пропустил более 9000 бросков, проиграл почти 300 игр. 26 раз мне доверяли сделать финальный победный бросок, и я промахивался. Я терпел поражения снова, и снова, и снова. И именно поэтому я добился успеха.
                    </p>
                    <p className={"text-footnote font-medium text-primary mt-1"}>
                        Майкл Джордан
                    </p>
                </div>
            </div>
        </div>
    );
}
