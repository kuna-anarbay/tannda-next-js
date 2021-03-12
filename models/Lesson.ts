import {Course} from "./Course";

export interface Lesson {
    id: number | null;
    course: Course | null;
    title: string | null;
}