import {Resource} from "./resource";
import Section from "./section";

export class Content {
    id: number;
    title: string;
    description?: string;
    type: ContentType;
    courseId: number;
    index: number;
    sectionId: number;
    status?: ContentStatus;
    resources?: Resource[];
}

export class AddContentReq {
    title: string;
    description?: string;
    type: ContentType;
    index: number;
    sectionId: number;
}


export class AddLessonReq {
    title: string;
    description?: string;
    index: number;
    sectionId: number;
}

export class UpdateContentReq {
    title: string;
    description?: string;
    sectionId: number;
}


export enum ContentType {
    SECTION = 'section',
    LESSON = 'lesson',
    ASSIGNMENT = 'assignment',
    ASSESSMENT = 'assessment'
}

export enum ContentStatus {
    HIDDEN = 'hidden',
    ACTIVE = 'active'
}

export const ContentStatusCases: ContentStatus[] = [
    ContentStatus.ACTIVE,
    ContentStatus.HIDDEN
]


export const contentStatusName = (status: ContentStatus) => {
    switch (status) {
        case ContentStatus.ACTIVE:
            return "Доступен";
        case ContentStatus.HIDDEN:
            return "Недоступен";
    }
}



export class ContentSection {
    content: Content;
    section: Section;
}
