import {useEffect, useState} from "react";
import {useAppData} from "../app/app-data-provider";
import ContentService from "../../services/content.service";
import {Content} from "../../models/content";
import {MemberRole} from "../../models/member";
import {getIcon, IconType} from "../util/icon";
import Section, {SectionData} from "../../models/section";
import SectionsComponent from "../section/sections.component";
import CreateLessonDrawer from "./create-lesson.drawer";
import ContentCell from "./content.cell";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';


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
    const [newContent, setNewContent] = useState(false);
    const [newLesson, setNewLesson] = useState(false);
    const [{sections, contents}, setSectionData] = useState(new SectionData());
    const [currentSection, setCurrentSection] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const {showError, cache, showSuccess} = useAppData();
    const contentService = new ContentService();


    useEffect(() => {
        getContents();
    }, [])


    const getContents = async (sync: boolean = false) => {
        if (sync) {
            setSyncing(true);
        } else {
            setLoading(true);
        }
        try {
            const data = await contentService.getContents(courseId);
            cache("contents", data.contents);
            cache("sections", data.sections);
            if (sync) {
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
            if (sync) {
                setSyncing(false);
            } else {
                setLoading(false);
            }
            showError(err.message);
        }
    }


    const handleOnDragEnd = async (result) => {
        if (!result.destination) return;
        if (result.destination.index === result.source.index) return;
        const items = Array.from(contents);
        const oldOrder = contents;
        let sourceContent = filteredContents()[result.source.index];
        let destinationContent = filteredContents()[result.destination.index];
        const sourceIndex = contents.findIndex(c => c.id === sourceContent.id);
        const destinationIndex = contents.findIndex(c => c.id === destinationContent.id);
        console.log(sourceIndex, destinationIndex);
        if (!sourceIndex) return;
        if (!destinationIndex) return;
        items.splice(sourceIndex, 1);
        items.splice(destinationIndex, 1);
        console.log(sourceIndex, destinationIndex);
        console.log(result.source.index, result.destination.index);
        items.push({
            ...sourceContent,
            index: result.destination.index
        });
        items.push({
            ...destinationContent,
            index: result.source.index
        });
        setSectionData({sections: sections, contents: items});

        // try {
        //     const message = await contentService.reorder(courseId, content.id, result.destination.index);
        //     showSuccess(message);
        // } catch (err) {
        //     showError(err.message);
        //     setSectionData({sections: sections, contents: oldOrder});
        // }
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


    const isNotStudent = () => {
        return role !== MemberRole.STUDENT;
    }


    return (
        <div className="py-6 space-y-4">
            <div className={"grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6"}>
                <SectionsComponent role={role}
                                   updateSections={updateSections}
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
                        {isNotStudent() ? (
                            <div className={"flex space-x-2"}>
                                <button onClick={() => setIsEditing(!isEditing)} className={"btn btn-sm btn-outline"}>
                                    {getIcon(IconType.Pencil)}
                                </button>
                                <div className={"relative"}>
                                    <button onClick={() => setNewLesson(!newLesson)} type={"button"}
                                            className={"btn btn-sm btn-outline flex items-center space-x-1"}>
                                        <p>
                                            Новый урок
                                        </p>
                                        {getIcon(IconType.ChevronDown)}
                                    </button>
                                    {newLesson ? (
                                        <div
                                            className={"mt-0.5 absolute list-bordered bg-background shadow-md border-border border rounded-1.5 w-full"}>
                                            <div
                                                onClick={() => setNewContent(!newContent)}
                                                className={"px-4 py-1 text-footnote cursor-pointer rounded-t-1.5 hover:bg-background-secondary"}>
                                                Lesson
                                            </div>
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
                                    <CreateLessonDrawer courseId={courseId} sectionId={currentSection}
                                                        open={newContent} close={() => setNewContent(!newContent)}
                                                        contentAdded={contentAdded} contents={filteredContents()}/>
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="draggable">
                            {(provided) => (
                                <div {...provided.droppableProps}
                                     ref={provided.innerRef} className={"mt-3 space-y-5"}>
                                    {filteredContents().map((content, index) => (
                                        <Draggable key={content.id} draggableId={`${content.id}`} index={index}>
                                            {(provided) => (
                                                <ContentCell provided={provided} isEditing={isEditing}
                                                             courseId={courseId} content={content}
                                                             isLast={index + 1 === filteredContents().length}/>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>

        </div>
    )
}
