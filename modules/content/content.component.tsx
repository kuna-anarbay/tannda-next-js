import Course from "../../models/course";
import {MemberRole} from "../../models/member";
import {useEffect, useState} from "react";
import {useAppData} from "../app/app-data-provider";
import ContentService from "../../services/content.service";
import Spinner from "../util/spinner.component";
import ContentsComponent from "./contents.component";
import Tab from "../util/tab";
import ContentInfoComponent from "./content-info.component";
import useInitialProps from "../../hooks/use.initial-props";
import Section from "../../models/section";
import {URLPath} from "../../services/http/URLPath";
import MembersComponent from "./members.component";

interface ContentComponentProps {
    contentId: number;
    course: Course;
    role: MemberRole;
    updateContent: (Content) => void;
}


export default function ContentComponent(props: ContentComponentProps) {
    const {contentId, course, role, updateContent} = props;
    const contentService = new ContentService();
    const [content, setContent] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0);
    const {showError} = useAppData();


    useEffect(() => {
        getContent();
    }, []);


    const tabs = [
        {
            title: "Содержание",
            component: <ContentInfoComponent contentUpdated={updateContent} role={role} content={content} courseId={course.id} />
        },
        {
            title: "Участники",
            component: <MembersComponent role={role} content={content} courseId={course.id} />
        }
    ]


    const getContent = async () => {
        try {
            const contentSection = await contentService.getContent(contentId, course.id);
            setContent(contentSection.content);
            updateContent(contentSection.content);
        } catch (err) {
            showError(err.message);
        }
    }


    if (!content) return <Spinner/>;

    return (
        <div className={"container mx-auto px-4 md:px-0"}>
            <div>
                <Tab tabs={tabs.map(t => t.title)} selectedTab={selectedTab}
                     selectTab={index => setSelectedTab(index)}/>
                {tabs.map((tab, index) => (
                    <div className={index === selectedTab ? "" : "hidden"}>
                        {tab.component}
                    </div>
                ))}
            </div>
        </div>
    )
}
