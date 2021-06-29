import Section from "../../models/section";
import {Content} from "../../models/content";
import SectionsController from "../sections/sections.controller";
import ContentsController from "../contents/contents.controller";
import {ContentType} from "../enum/content-type.enum";
import Affix from "@uiw/react-affix";

interface ContentDataViewProps {
    courseId: number;
    canEdit: boolean;
    loading: boolean;
    reload: () => void;
    sections: Section[];
    contents: Content[];
    selectedSection: Section;
    createContent: (type: ContentType) => void;
    selectSection: (section: Section) => void;
    sectionsUpdated: (sections: Section[]) => void;
    contentsUpdated: (contents: Content[]) => void;
    showContent: (content: Content) => void;
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
        sectionsUpdated,
        showContent,
        contentsUpdated,
        createContent
    } = props;


    return (
        <div className="py-6 space-y-4">
            <div className={"grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6"}>
                <div>
                    <Affix offsetTop={64}>
                        <SectionsController courseId={courseId}
                                            selectedSection={selectedSection}
                                            selectSection={selectSection}
                                            loading={loading}
                                            reload={reload}
                                            canEdit={canEdit}
                                            sections={sections}
                                            sectionsUpdated={sectionsUpdated}
                        />
                    </Affix>
                </div>
                <div className={"md:col-span-2"}>
                    <ContentsController courseId={courseId}
                                        contents={contents}
                                        canEdit={canEdit}
                                        createContent={createContent}
                                        contentsUpdated={contentsUpdated}
                                        showContent={showContent}
                    />
                </div>
            </div>
        </div>
    )
}
