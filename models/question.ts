import {QuestionOption} from "./question-option";
import {Answer} from "./answer";

export class Question {
    id: number;
    targetId: number;
    targetType: QuestionTarget;
    title: string;
    type: QuestionType;
    points: number;
    options: QuestionOption[];
    answer: Answer;
}

export enum QuestionType {
    TEXT = 'text',
    SELECT = 'select',
    MULTIPLE_SELECT = 'multiple_select',
    UPLOAD = 'upload'
}

export enum QuestionTarget {
    CONTENT = 'content'
}


export const allQuestionTypes = [
    QuestionType.TEXT,
    QuestionType.SELECT,
    QuestionType.MULTIPLE_SELECT,
    QuestionType.UPLOAD
]
