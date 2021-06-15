import {CoursePageProps} from "../../pages/courses/[course_id]";
import Tab from "../util/tab";
import {useState} from "react";
import ContentsComponent from "../content/contents.component";
import MembersComponent from "../member/members.component";
import {MemberRole} from "../../models/member";
import EditCourseComponent from "./edit-course.component";

export default function CourseComponent(props: CoursePageProps) {
    const {id, course, role, courseEdited} = props;
    const [selectedTab, setSelectedTab] = useState(0);

    const managerTabs = [
        {
            title: "Содержание",
            component: <ContentsComponent role={role} courseId={id}/>
        },
        {
            title: "Участники",
            component: <MembersComponent role={role} courseId={id}/>
        },
        {
            title: "Инфо",
            component: <EditCourseComponent course={course} courseEdited={courseEdited} />
        }
    ]

    const teacherTabs = [
        {
            title: "Содержание",
            component: <ContentsComponent role={role} courseId={id}/>
        },
        {
            title: "Участники",
            component: <MembersComponent role={role} courseId={id}/>
        },
        {
            title: "Инфо",
            component: <EditCourseComponent course={course} courseEdited={courseEdited} />
        }
    ]

    const studentTabs = [
        {
            title: "Содержание",
            component: <ContentsComponent role={role} courseId={id}/>
        },
        {
            title: "Оценки",
            component: <ContentsComponent role={role} courseId={id}/>
        },
        {
            title: "Посещаемость",
            component: <ContentsComponent role={role} courseId={id}/>
        },
    ]

    const getTabs = () => {
        switch (role) {
            case MemberRole.STUDENT:
                return studentTabs;
            case MemberRole.TEACHER:
                return teacherTabs;
            case MemberRole.MANAGER:
            case MemberRole.OWNER:
                return managerTabs;
        }
    }

    return (
        <div className={"container mx-auto px-4 md:px-0"}>
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
