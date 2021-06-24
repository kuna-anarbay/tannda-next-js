import Section from "../../models/section";
import {Content} from "../../models/content";
import SectionsController from "../sections/sections.controller";

interface ContentDataViewProps {
    courseId: number;
    canEdit: boolean;
    loading: boolean;
    reload: () => void;
    sections: Section[];
    contents: Content[];
    selectedSection: Section;
    selectSection: (section: Section) => void;
    sectionsUpdated: (sections: Section[]) => void;
}

export default function ContentDataView(props: ContentDataViewProps) {
    const {
        courseId,
        sections,
        contents,
        selectedSection,
        selectSection,
        canEdit,
        reload,
        loading,
        sectionsUpdated
    } = props;


    return (
        <div className="py-6 space-y-4">
            <div className={"grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6"}>
                <SectionsController courseId={courseId}
                                    selectedSection={selectedSection}
                                    selectSection={selectSection}
                                    loading={loading}
                                    reload={reload}
                                    canEdit={canEdit}
                                    sections={sections}
                                    sectionsUpdated={sectionsUpdated}
                />
            </div>
        </div>
    )
}