import {useEffect, useState} from "react";
import {useAppData} from "../app/app-data-provider";
import ContentService from "../../services/content.service";
import {Content} from "../../models/content";
import {MemberRole} from "../../models/member";
import {getIcon, IconType} from "../util/icon";

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
    const [contents, setContents] = useState(Array<Content>());
    const {showError} = useAppData();
    const [content, setContent] = useState(null);
    const [newContent, setNewContent] = useState(false);
    const [contentOpen, setContentOpen] = useState(false);
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
            setContents(data);
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    }

    const handleSelect = (content) => {
        setContent(content)
        setContentOpen(!contentOpen)
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
                            <button onClick={() => setNewContent(!newContent)} type={"button"}
                                    className={"btn btn-sm btn-outline"}>
                                Новый модуль
                            </button>
                        </div>
                    </div>
                    <div className={"border border-border rounded-lg mt-3"}>
                        <div className={"px-4 py-2 text-footnote border-b border-border"}>
                            Getting Started with iOS Development and Swift 5
                        </div>
                        <div className={"px-4 py-2 text-footnote"}>
                            Swift Programming Basics - Collections, Constants & Variables
                        </div>
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
                                        <div className={"px-4 py-1 text-footnote cursor-pointer hover:bg-background-secondary"}>
                                            Lesson
                                        </div>
                                        <div className={"px-4 py-1 text-footnote cursor-pointer hover:bg-background-secondary"}>
                                            Assignment
                                        </div>
                                        <div className={"px-4 py-1 text-footnote cursor-pointer rounded-b-1.5 hover:bg-background-secondary"}>
                                            Assessment
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className={"mt-3 space-y-5"}>
                        <div className={"space-y-2"}>
                            <h3 className={"font-semibold"}>
                                Calculator Challenge Solution and Walkthrough
                            </h3>
                            <p className={"text-footnote text-label-secondary"}>
                                Hint: To complete this challenge, you will have to think carefully about how to use
                                Stack Views effectively. For example, try using 5 different horizontal Stack Views for
                                the buttons and then put all the horizontal Stack Views into a single vertical Stack
                                View. Also, inspect your Stack View's properties. Check how much space the Stack View is
                                giving its children. Is it distributing them equally or otherwise?
                            </p>
                            <div>
                                <div className={"flex items-center space-x-3"}>
                                    <div>
                                        {getIcon(IconType.Pencil)}
                                    </div>
                                    <div>
                                        <p className={"text-footnote"}>
                                            Product OKR this month.docx
                                        </p>
                                        <p className={"text-caption1 text-label-secondary"}>
                                            10.7 KB
                                        </p>
                                    </div>
                                </div>
                                <div className={"flex items-center space-x-3"}>
                                    <div>
                                        {getIcon(IconType.Pencil)}
                                    </div>
                                    <div>
                                        <p className={"text-footnote"}>
                                            Product OKR this month.docx
                                        </p>
                                        <p className={"text-caption1 text-label-secondary"}>
                                            10.7 KB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </div>
            </div>

        </div>
    )
}
