import Tab from "../util/tab";
import {Content, ContentType} from "../../models/content.entity";
import Course from "../../models/course.entity";
import ContentMembersController from "../content-members/content-members.controller";
import {Route} from "../app/route";
import PageHeader from "../util/page-header";
import ContentInfoController from "../content-info/content-info.controller";

interface ContentViewProps {
    content: Content;
    course: Course;
    canEdit: boolean;
    selectedTab: number;
    setSelectedTab: (index: number) => void;
    relationId?: number;
}

export default function ContentView(props: ContentViewProps) {
    const {content, course, canEdit, selectedTab, setSelectedTab, relationId} = props;

    const tabs = [
        {
            title: "Overview",
            component: <ContentInfoController courseId={course.id} relationId={relationId} content={content}/>
        },
        {
            title: "Участники",
            component: <ContentMembersController isLesson={content.type === ContentType.LESSON}
                                                 courseId={course.id}
                                                 contentId={content.id}
                                                 canEdit={canEdit}/>
        }
    ];


    return (
        <div className={"container mx-auto px-4 md:px-0"}>
            <PageHeader title={content.title} items={[
                {
                    title: "Courses",
                    path: Route.courses.my
                },
                {
                    title: course.title,
                    path: Route.courses.id(course.id)
                },
                {
                    title: content.title
                }
            ]}/>
            {canEdit ? (
                <div>
                    <Tab tabs={tabs.map(t => t.title)} selectedTab={selectedTab}
                         selectTab={index => setSelectedTab(index)}/>
                    {tabs.map((tab, index) => (
                        <div className={index === selectedTab ? "" : "hidden"}>
                            {tab.component}
                        </div>
                    ))}
                </div>
            ) : (
                <ContentInfoController courseId={course.id} relationId={relationId} content={content}/>
            )}
        </div>
    )
}
