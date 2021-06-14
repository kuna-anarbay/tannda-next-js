import {useEffect, useState} from "react";
import {useAppData} from "../app/app-data-provider";
import ContentService from "../../services/content.service";
import {Content} from "../../models/content";
import {MemberRole} from "../../models/member";
import {getIcon, IconType} from "../util/icon";
import NewSectionComponent from "./new-section.component";
import Section, {SectionData} from "../../models/section";
import AddContentComponent from "./add-content.component";

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
    const [{sections, contents}, setSectionData] = useState(new SectionData());
    const [currentSection, setCurrentSection] = useState(0);
    const {showError} = useAppData();
    const [newSection, setNewSection] = useState(false);
    const [newContent, setNewContent] = useState(false);
    const [newLesson, setNewLesson] = useState(false);
    const contentAction = new ContentService();

    useEffect(() => {
        getContents();
    }, [])

    const getContents = async () => {
        setLoading(true);
        try {
            const data = await contentAction.getContents(courseId);
            setLoading(false);
            setSectionData(data);

            const firstSection = sortedSections()[0];
            if (firstSection) {
                setCurrentSection(firstSection.id);
            }
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    }

    const sectionAdded = (section: Section) => {
        sections.push(section);
        setSectionData({sections: sections, contents: contents});
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

    return (
        <div className="py-6 space-y-4">
            <div className={"grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6"}>
                <div>
                    <div className={"flex justify-between items-center"}>
                        <h3 className={"text-base font-medium"}>
                            Модули
                        </h3>
                        <div className={"flex space-x-2"}>
                            <button className={"btn btn-sm btn-outline"}>
                                {getIcon(IconType.Sync)}
                            </button>
                            <button onClick={() => setNewSection(!newSection)} type={"button"}
                                    className={"btn btn-sm btn-outline"}>
                                Новый модуль
                            </button>
                            <NewSectionComponent courseId={courseId} open={newSection}
                                                 close={() => setNewSection(!newSection)}
                                                 sectionAdded={sectionAdded}
                                                 sections={sections}/>
                        </div>
                    </div>
                    <div className={"border border-border rounded-lg mt-3"}>
                        {sortedSections().map((section, index) => (
                            <div
                                onClick={() => setCurrentSection(section.id)}
                                className={`px-4 py-2 text-footnote cursor-pointer hover:text-primary border-border ${currentSection === section.id ? "text-primary font-semibold" : ""} ${index + 1 === sections.length ? "" : "border-b"}`}>
                                {section.title}
                            </div>
                        ))}
                    </div>
                </div>
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
                                    <h3 className={"font-semibold"}>
                                        {content.title}
                                    </h3>
                                    <p className={"text-footnote text-label-secondary"}>
                                        {content.description}
                                    </p>
                                    <div>
                                        {content.resources.map(resource => (
                                            <div className={"flex items-center space-x-3"}>
                                                <div>
                                                    {getIcon(IconType.Pencil)}
                                                </div>
                                                <div>
                                                    <p className={"text-footnote"}>
                                                        {resource.originalName}
                                                    </p>
                                                    <p className={"text-caption1 text-label-secondary"}>
                                                        10.7 KB
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                { index + 1 < filteredContents().length ? <hr/> : null}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
