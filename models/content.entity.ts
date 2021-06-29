import {Resource} from "./resource.entity";
import Section from "./section.entity";
import {QuestionType} from "./question.entity";
import {Presence} from "./presence.entity";
import {Grade} from "./grade.entity";
import {Submission} from "./submission.entity";

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


export const contentStatusName = (status: ContentStatus): string => {
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
