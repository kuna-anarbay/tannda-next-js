import ContentDataView from "./content-data.view";
import ContentDataService from "./content-data.service";
import {CacheItem, useAppData} from "../app/app-data-provider";
import {useEffect, useState} from "react";
import Section from "../../models/section";
import {Content} from "../../models/content";
import {ContentType} from "../enum/content-type.enum";
import {useRouter} from "next/router";
import NewLessonController from "../new-lesson/new-lesson.controller";
import NewAssignmentController from "../new-assignment/new-assignment.controller";
import NewExamController from "../new-exam/new-exam.controller";

interface ContentDataControllerProps {
    canEdit: boolean;
    courseId: number;
}

export default function ContentDataController(props: ContentDataControllerProps) {
    const {courseId, canEdit} = props;
    const contentDataService = new ContentDataService();
    const {showError, getItem, setItem} = useAppData();
    const {push} = useRouter();
    const [sections, setSections] = useState(getItem(CacheItem.SECTIONS) ?? Array<Section>());
    const [contents, setContents] = useState(getItem(CacheItem.CONTENTS) ?? Array<Content>());
    const [selectedSection, setSelectedSection] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newLessonModal, setNewLessonModal] = useState(false);
    const [newAssignmentModal, setNewAssignmentModal] = useState(false);
    const [newExamModal, setNewExamModal] = useState(false);


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

    const contentsUpdated = (contents: Content[]) => {
        if (contents.length === 0) return;
        let sectionId = contents[0].sectionId;
        let items = contents.filter(c => c.sectionId !== sectionId);
        setContents([...items, ...contents])
    }

    const createContent = (type: ContentType) => {
        switch (type) {
            case ContentType.LESSON:
                setNewLessonModal(!newLessonModal);
                break;
            case ContentType.ASSIGNMENT:
                setNewAssignmentModal(!newAssignmentModal);
                break;
            case ContentType.EXAM:
                setNewExamModal(!newExamModal);
                break;
        }
    }

    const showContent = async (content: Content) => {
        await push(`/courses/${courseId}/contents/${content.id}`);
    }

    const filteredContents = () => {
        if (!selectedSection) return [];
        return contents.filter(c => c.sectionId === selectedSection.id).sort((a, b) => a.index - b.index);
    }

    const contentAdded = (content: Content) => {
        setContents([...contents, content]);
    }

    return (
        <div>
            <ContentDataView courseId={courseId}
                             canEdit={canEdit}
                             loading={loading}
                             reload={getContentData}
                             sections={sortedSections()}
                             contents={filteredContents()}
                             selectedSection={selectedSection}
                             selectSection={selectSection}
                             sectionsUpdated={sectionsUpdated}
                             contentsUpdated={contentsUpdated}
                             createContent={createContent}
                             showContent={showContent}
            />
            <NewLessonController sections={sections}
                                 courseId={courseId}
                                 open={newLessonModal}
                                 contentAdded={contentAdded}
                                 close={() => setNewLessonModal(!newLessonModal)}
                                 defaultSectionId={selectedSection?.id}
            />
            <NewAssignmentController sections={sections}
                                     courseId={courseId}
                                     open={newAssignmentModal}
                                     close={() => setNewAssignmentModal(!newAssignmentModal)}
                                     contentAdded={contentAdded}
                                     defaultSectionId={selectedSection?.id}
            />
            <NewExamController sections={sections}
                               courseId={courseId}
                               open={newExamModal}
                               close={() => setNewExamModal(!newExamModal)}
                               contentAdded={contentAdded}
                               defaultSectionId={selectedSection?.id}
            />
        </div>
    )
}
