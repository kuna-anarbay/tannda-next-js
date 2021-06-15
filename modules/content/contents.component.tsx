import {useEffect, useState} from "react";
import {useAppData} from "../app/app-data-provider";
import ContentService from "../../services/content.service";
import {Content} from "../../models/content";
import {MemberRole} from "../../models/member";
import {getIcon, IconType} from "../util/icon";
import Section, {SectionData} from "../../models/section";
import AddContentComponent from "./add-content.component";
import {resourceIcon} from "../resources/resource.icon";
import {bytesToSize} from "../../models/resource";
import SectionsComponent from "./sections.component";

export interface ContentComponentProps {
    content: Content;
    selected?: boolean;
    onSelect?: (Content) => void;
    open?: boolean;
    close?: () => void;
}

interface ContentsComponentProps {
    courseId: number;
    role: MemberRole;
}

export default function ContentsComponent(props: ContentsComponentProps) {
    const {courseId, role} = props;
    const [loading, setLoading] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const [{sections, contents}, setSectionData] = useState(new SectionData());
    const [currentSection, setCurrentSection] = useState(0);
    const {showError} = useAppData();

    const [newContent, setNewContent] = useState(false);
    const [newLesson, setNewLesson] = useState(false);
    const contentAction = new ContentService();

    useEffect(() => {
        getContents();
    }, [])

    const getContents = async (sync: boolean = false) => {
        if(sync) {
            setSyncing(true);
        } else {
            setLoading(true);
        }
        try {
            const data = await contentAction.getContents(courseId);
            if(sync) {
                setSyncing(false);
            } else {
                setLoading(false);
            }
            setSectionData({
                sections: data.sections.sort((a, b) => a.index - b.index),
                contents: data.contents
            });

            const firstSection = sortedSections()[0];
            if (firstSection) {
                setCurrentSection(firstSection.id);
            }
        } catch (err) {
            if(sync) {
                setSyncing(false);
            } else {
                setLoading(false);
            }
            showError(err.message);
        }
    }

    const contentAdded = (content: Content) => {
        contents.push(content);
        setSectionData({sections: sections, contents: contents});
    }

    const filteredContents = (): Content[] => {
        return contents.filter(c => c.sectionId === currentSection).sort((a, b) => a.index - b.index);
    }

    const sortedSections = (): Section[] => {
        if (!sections) {
            return [];
        }
        return sections.sort((a, b) => a.index - b.index);
    }

    const updateSections = (sections: Section[]) => {
        setSectionData({sections: sections, contents: contents});
    }

    return (
        <div className="py-6 space-y-4">
            <div className={"grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6"}>
                <SectionsComponent updateSections={updateSections}
                                   syncing={syncing}
                                   loading={loading}
                                   courseId={courseId}
                                   reload={() => getContents(true)}
                                   sections={sections}
                                   currentSection={currentSection}
                                   setCurrentSection={section => setCurrentSection(section.id)}/>
                <div className={"md:col-span-2"}>
                    <div className={"flex justify-between items-center"}>
                        <h3 className={"text-base font-medium"}>
                            Уроки
                        </h3>
                        <div className={"flex space-x-2"}>
                            <button className={"btn btn-outline"}>
                                {getIcon(IconType.Sync)}
                            </button>
                            <div className={"relative"}>
                                <button onClick={() => setNewLesson(!newLesson)} type={"button"}
                                        className={"btn btn-sm btn-outline flex items-center space-x-1 " + (newLesson ? "rounded-none rounded-t-1.5" : "")}>
                                    <p>
                                        Новый урок
                                    </p>
                                    {getIcon(IconType.ChevronDown)}
                                </button>
                                {newLesson ? (
                                    <div className={"absolute bg-background shadow-md rounded-b-1.5 w-full"}>
                                        <div
                                            onClick={() => setNewContent(!newContent)}
                                            className={"px-4 py-1 text-footnote cursor-pointer hover:bg-background-secondary"}>
                                            Lesson
                                        </div>
                                        <AddContentComponent courseId={courseId} sectionId={currentSection}
                                                             open={newContent} close={() => setNewContent(!newContent)}
                                                             contentAdded={contentAdded} contents={filteredContents()}/>
                                        <div
                                            className={"px-4 py-1 text-footnote cursor-pointer hover:bg-background-secondary"}>
                                            Assignment
                                        </div>
                                        <div
                                            className={"px-4 py-1 text-footnote cursor-pointer rounded-b-1.5 hover:bg-background-secondary"}>
                                            Assessment
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className={"mt-3 space-y-5"}>
                        {filteredContents().map((content, index) => (
                            <div className={" space-y-5"}>
                                <div className={"space-y-2"}>
                                    <div className={"space-y-1"}>
                                        <h3 className={"font-semibold"}>
                                            {content.title}
                                        </h3>
                                        <p className={"text-footnote text-label-secondary"}>
                                            {content.description}
                                        </p>
                                    </div>
                                    <div className={"space-y-1.5"}>
                                        {content.resources.map(resource => (
                                            <a href={resource.url} target={"_blank"}
                                               className={"block flex items-center space-x-3 cursor-pointer"}>
                                                <div>
                                                    <img className={"h-10 w-8"}
                                                         src={resourceIcon(resource.originalName)}/>
                                                </ div>
                                                <div>
                                                    <p className={"text-footnote"}>
                                                        {resource.originalName}
                                                    </p>
                                                    <p className={"text-caption1 text-label-secondary"}>
                                                        {bytesToSize(resource.size)}
                                                    </p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                {index + 1 < filteredContents().length ? <hr/> : null}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
