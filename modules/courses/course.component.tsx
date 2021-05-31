import PageHeader from "../util/page-header";
import {CoursePageProps} from "../../pages/courses/[id]";
import Tab from "../util/tab";
import {useState} from "react";
import ContentsComponent from "../content/contents.component";
import CourseAction from "./course.action";
import StateView from "../util/state-view";

export default function CourseComponent(props: CoursePageProps) {
    const courseAction = new CourseAction();
    const [selectedTab, setSelectedTab] = useState(0);
    const {data} = courseAction.getCourse(props.id);

    if(!data) {
        return <StateView title={"Loading"} />
    }
    return (
        <div className={"container mx-auto"}>
            <PageHeader title={data.title.ru} items={[
                {
                    title: "Courses",
                    path: "/courses"
                },
                {
                    title: data.title.ru
                }
            ]}/>

            <div className={"px-container"}>
                <Tab tabs={["Content", "Students", "Info"]} selectedTab={selectedTab}
                     selectTab={index => setSelectedTab(index)}/>
                <ContentsComponent courseId={props.id}/>
            </div>
        </div>
    )
}
