import ContentDataView from "./content-data.view";
import ContentDataService from "./content-data.service";
import {CacheItem, useAppData} from "../app/app-data-provider";
import {useEffect, useState} from "react";
import Section from "../../models/section";
import {Content} from "../../models/content";

interface ContentDataControllerProps {
    canEdit: boolean;
    courseId: number;
}

export default function ContentDataController(props: ContentDataControllerProps) {
    const {courseId, canEdit} = props;
    const contentDataService = new ContentDataService();
    const {showError, getItem, setItem} = useAppData();
    const [sections, setSections] = useState(getItem(CacheItem.SECTIONS) ?? Array<Section>());
    const [contents, setContents] = useState(getItem(CacheItem.CONTENTS) ?? Array<Content>());
    const [selectedSection, setSelectedSection] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getContentData();
    }, []);

    const getContentData = async () => {
        setLoading(true);
        try {
            const data = await contentDataService.getContentData(courseId);
            setLoading(false);
            setItem(CacheItem.SECTIONS, data.sections);
            setItem(CacheItem.CONTENTS, data.contents);
            setSections(data.sections);
            setContents(data.contents);
            if (data.sections.length > 0) {
                selectSection(sortedSections()[0]);
            }
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    }

    const sectionsUpdated = (sections: Section[]) => {
        setSections(sections);
    }

    const selectSection = (section: Section) => {
        setSelectedSection(section);
    }

    const sortedSections = () => {
        return sections.sort((a, b) => a.index - b.index);
    }

    return <ContentDataView courseId={courseId}
                            canEdit={canEdit}
                            loading={loading}
                            reload={getContentData}
                            sections={sortedSections()}
                            contents={contents}
                            selectedSection={selectedSection}
                            selectSection={selectSection}
                            sectionsUpdated={sectionsUpdated}
    />
}