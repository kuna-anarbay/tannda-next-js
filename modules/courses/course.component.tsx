import {CoursePageProps} from "../../pages/courses/[id]";
import Tab from "../util/tab";
import {useState} from "react";
import ContentsComponent from "../content/contents.component";

export default function CourseComponent(props: CoursePageProps) {

    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div className={"container mx-auto"}>
            {/*<PageHeader title={data.title.ru} items={[*/}
            {/*    {*/}
            {/*        title: "Courses",*/}
            {/*        path: "/courses"*/}
            {/*    },*/}
            {/*    {*/}
            {/*        title: data.title.ru*/}
            {/*    }*/}
            {/*]}/>*/}

            <div className={"px-container"}>
                <Tab tabs={["Content", "Students", "Info"]} selectedTab={selectedTab}
                     selectTab={index => setSelectedTab(index)}/>
                <ContentsComponent courseId={props.id}/>
            </div>
        </div>
    )
}
