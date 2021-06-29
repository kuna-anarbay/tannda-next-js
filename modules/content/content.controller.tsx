import ContentService from "./content.service";
import {MemberRole} from "../../models/member.entity";
import {useEffect, useState} from "react";
import ContentView from "./content.view";
import {CacheItem, useAppData} from "../app/app-data-provider";

interface ContentControllerProps {
    contentId: number;
    courseId: number;
}

export default function ContentController(props: ContentControllerProps) {
    const {contentId, courseId} = props;
    const contentService = new ContentService();
    const {getItem, setItem, showError} = useAppData();
    const [selectedTab, setSelectedTab] = useState(0);
    const [content, setContent] = useState(getItem(CacheItem.CONTENTS, contentId));
    const [course, setCourse] = useState(getItem(CacheItem.COURSES, courseId));
    const [relationId, setRelationId] = useState(null);
    const role = course?.member?.role;

    useEffect(() => {
        getCourse();
        getContent();
    }, [])

    const canEdit = () => {
        return role !== MemberRole.STUDENT;
    }

    const getCourse = async () => {
        try {
            const data = await contentService.getCourse(courseId);
            setCourse(data);
        } catch (err) {
            showError(err.message);
        }
    }

    const getContent = async () => {
        try {
            const data = await contentService.getContent(courseId, contentId);
            setContent(data.content);
            setRelationId(data.relationId);
        } catch (err) {
            showError(err.message);
        }
    }

    if (!course || !content) return null;

    return <ContentView relationId={relationId}
                        content={content}
                        course={course}
                        canEdit={canEdit()}
                        selectedTab={selectedTab}
                        setSelectedTab={index => setSelectedTab(index)}
    />
}
