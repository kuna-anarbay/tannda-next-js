import {CoursePageProps} from "../../pages/courses/[course_id]";
import Tab from "../util/tab";
import {useEffect, useState} from "react";
import ContentsComponent from "../content/contents.component";
import CourseService from "../../services/course.service";
import {useToasts} from "react-toast-notifications";
import PageHeader from "../util/page-header";
import MembersComponent from "./members.component";

export default function CourseComponent(props: CoursePageProps) {
    const {id} = props;
    const courseService = new CourseService();
    const {addToast} = useToasts();
    const [course, setCourse] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        getCourse();
    }, []);

    const getCourse = async () => {
        try {
            const course = await courseService.getCourse(props.id);
            setCourse(course);
        } catch (err) {
            addToast(err.message, {autoDismiss: true, appearance: "error"});
        }
    }

    const tabs = [
        {
            title: "Content",
            component: <ContentsComponent courseId={id}/>
        },
        {
            title: "Members",
            component: <MembersComponent id={id}/>
        }
    ]

    return (
        <div className={"container mx-auto"}>
            {course ? (
                <div>
                    <PageHeader title={course.title} details={course.description} items={[
                        {
                            title: "Courses",
                            path: "/courses"
                        },
                        {
                            title: course.title
                        }
                    ]}/>

                    <div className={"px-container"}>
                        <Tab tabs={tabs.map(t => t.title)} selectedTab={selectedTab}
                             selectTab={index => setSelectedTab(index)}/>
                        {tabs.map((tab, index) => (
                            <div className={index === selectedTab ? "block" : "hidden"}>
                                {tab.component}
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    )
}
