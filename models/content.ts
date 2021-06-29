import {Resource} from "./resource";
import Section from "./section";
import {QuestionType} from "./question";
import {Presence} from "./presence";
import {Grade} from "./grade";
import {Submission} from "./submission";

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
    questionType?: QuestionType;
    presence?: Presence;
    grade?: Grade;
    submission?: Submission;
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
    relationId?: number;
}
