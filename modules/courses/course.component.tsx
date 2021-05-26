import PageHeader from "../../components/page-header";
import {CoursePageProps} from "../../pages/courses/[id]";
import Tab from "../../components/tab";
import {useState} from "react";
import ErrorState from "../../components/error-state";

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
                <ErrorState />

                { props.id}
            </div>
        </div>
    )
}
