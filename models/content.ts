import {Resource} from "./resource";

export class Content {
    id: number;
    title: string;
    description?: string;
    type: ContentType;
    courseId: number;
    prevId?: number;
    status?: ContentStatus;
    resources?: Resource[];
}

export class AddContentReq {
    title: string;
    description?: string;
    type: ContentType;
    prevId?: number;
}


export enum ContentType {
    SECTION = 'section',
    LESSON = 'lesson',
    ASSIGNMENT = 'assignment',
    ASSESSMENT = 'assessment'
}

export const contentTypes = [
    ContentType.SECTION,
    ContentType.LESSON,
    ContentType.ASSIGNMENT,
    ContentType.ASSESSMENT
]

export enum ContentStatus {
    HIDDEN = 'hidden',
    ACTIVE = 'active'
}

export enum EntityStatus {
    ACTIVE = 'active',
    DISABLED = 'disabled',
    DELETED = 'deleted'
}
