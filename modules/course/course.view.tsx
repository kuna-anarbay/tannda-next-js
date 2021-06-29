import Course from "../../models/course.entity";
import Tab from "../util/tab";
import {useState} from "react";
import {MemberRole} from "../../models/member.entity";
import PageHeader from "../util/page-header";
import {Route} from "../app/route";
import CourseMembersController from "../course-members/course-members.controller";
import ContentDataController from "../content-data/content-data.controller";

interface CourseViewProps {
    course: Course;
    loading: boolean;
}

export default function CourseView(props: CourseViewProps) {
    const {course} = props;
    const {id} = course;
    const role = course?.member?.role;
    const [selectedTab, setSelectedTab] = useState(0);

    const canEdit = () => {
        return role !== MemberRole.STUDENT;
    }

    const managerTabs = [
        {
            title: "Содержание",
            component: <ContentDataController canEdit={canEdit()} courseId={course.id}/>
        },
        {
            title: "Участники",
            component: <CourseMembersController course={course}/>
        },
        // {
        //     title: "Инфо",
        //     component: <EditCourseComponent course={course} courseEdited={courseEdited}/>
        // }
    ]

    const teacherTabs = [
        {
            title: "Содержание",
            component: <ContentDataController canEdit={canEdit()} courseId={course.id}/>
        },
        // {
        //     title: "Участники",
        //     component: <MembersComponent role={role} courseId={id}/>
        // },
        // {
        //     title: "Инфо",
        //     component: <EditCourseComponent course={course} courseEdited={courseEdited}/>
        // }
    ]

    const studentTabs = [
        {
            title: "Содержание",
            component: <ContentDataController canEdit={canEdit()} courseId={course.id}/>
        }
    ]

    const getTabs = () => {
        switch (role) {
            case MemberRole.TEACHER:
                return teacherTabs;
            case MemberRole.MANAGER:
            case MemberRole.OWNER:
                return managerTabs;
            default:
                return studentTabs;
        }
    }

    return (
        <div className={"container mx-auto px-4 md:px-0"}>
            <PageHeader title={course.title} items={[
                {
                    title: "Courses",
                    path: Route.courses.my
                },
                {
                    title: course.title
                }
            ]}/>
            <div>
                <Tab tabs={getTabs().map(t => t.title)} selectedTab={selectedTab}
                     selectTab={index => setSelectedTab(index)}/>
                {getTabs().map((tab, index) => (
                    <div className={index === selectedTab ? "block" : "hidden"}>
                        {tab.component}
                    </div>
                ))}
            </div>
        </div>
    )
}
