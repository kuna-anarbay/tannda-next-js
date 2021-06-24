import MyCoursesService from "./my-courses.service";
import {useEffect, useState} from "react";
import Course from "../../models/course";
import MyCoursesView from "./my-courses.view";
import {CacheItem, useAppData} from "../app/app-data-provider";
import {useRouter} from "next/router";
import {Route} from "../app/route";
import {MemberStatus} from "../../models/member";

interface MyCoursesControllerProps {

}

export default function MyCoursesController(props: MyCoursesControllerProps) {
    const myCoursesService = new MyCoursesService();
    const {push} = useRouter();
    const {role, showError, getItem, setItem} = useAppData();
    const [activeCourses, setActiveCourses] = useState(getItem(CacheItem.COURSES) ?? Array<Course>());
    const [pendingCourses, setPendingCourses] = useState(Array<Course>());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getActiveCourses();
        getPendingCourses();
    }, []);


    const getActiveCourses = async () => {
        setLoading(activeCourses.length === 0);
        try {
            const courses = await myCoursesService.getActiveCourses();
            setLoading(false);
            setItem(CacheItem.COURSES, courses);
            setActiveCourses(courses);
        } catch (err) {
            showError(err.message);
        }
    }

    const getPendingCourses = async () => {
        try {
            const courses = await myCoursesService.getPendingCourses();
            setPendingCourses(courses);
        } catch (err) {
            showError(err.message);
        }
    }

    const createNewCourse = async () => {
        await push(Route.courses.new);
    }

    const openCourse = async (course: Course) => {
        await push(Route.courses.id(course.id));
    }

    const respondToInvitation = async (course: Course, status: MemberStatus.ACTIVE | MemberStatus.REJECTED) => {
        setPendingCourses(pendingCourses.filter(c => c.id !== course.id));
        if (status === MemberStatus.ACTIVE) {
            setActiveCourses([...activeCourses, course]);
        }

        try {
            await myCoursesService.respondToInvitation(course.id, {status});
        } catch (err) {
            showError(err.message);
            setPendingCourses([...pendingCourses, course]);
            if (status === MemberStatus.ACTIVE) {
                setActiveCourses(activeCourses.filter(c => c.id !== course.id));
            }
        }
    }

    return <MyCoursesView role={role}
                          loading={loading}
                          activeCourses={activeCourses}
                          pendingCourses={pendingCourses}
                          createNewCourse={createNewCourse}
                          openCourse={openCourse}
                          respondToInvitation={respondToInvitation}/>
}
