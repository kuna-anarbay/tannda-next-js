import PageHeader from "../util/page-header";
import {CoursePageProps} from "../../pages/courses/[id]";
import Tab from "../util/tab";
import {useState} from "react";
import StateView from "../util/state-view";
import {IconType} from "../../util/icon";
import SectionComponent from "../content/section.component";
import LessonComponent from "../content/lesson.component";
import ContentsComponent from "../content/contents.component";

export default function CourseComponent(props: CoursePageProps) {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div className={"container mx-auto"}>
            <PageHeader title={"Web development"} items={[
                {
                    title: "Courses",
                    path: "/courses"
                },
                {
                    title: "Web development"
                }
            ]}/>

            <div className={"px-container"}>
                <Tab tabs={["Content", "Students", "Info"]} selectedTab={selectedTab} selectTab={index => setSelectedTab(index)} />
                <ContentsComponent courseId={props.id} />
            </div>
        </div>
    )
}
