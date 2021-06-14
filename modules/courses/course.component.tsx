import {CoursePageProps} from "../../pages/courses/[course_id]";
import Tab from "../util/tab";
import {useState} from "react";
import ContentsComponent from "../content/contents.component";
import MembersComponent from "../member/members.component";
import {MemberRole} from "../../models/member";

export default function CourseComponent(props: CoursePageProps) {
    const {id, course, role} = props;
    const [selectedTab, setSelectedTab] = useState(0);

    const tabs = [
        {
            title: "Содержание",
            component: <ContentsComponent role={role} courseId={id}/>
        },
        {
            title: "Участники",
            component: <MembersComponent role={role} id={id}/>
        }
    ]

    return (
        <div className={"container mx-auto px-4 md:px-0"}>
            {role === MemberRole.STUDENT ? (
                <ContentsComponent role={role} courseId={id}/>
            ) : (
                <div>
                    <Tab tabs={tabs.map(t => t.title)} selectedTab={selectedTab}
                         selectTab={index => setSelectedTab(index)}/>
                    {tabs.map((tab, index) => (
                        <div className={index === selectedTab ? "block" : "hidden"}>
                            {tab.component}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
