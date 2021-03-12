import {Course} from "./Course";
import {Timestamp} from "./Timestamp";
import {Employment} from "./Employment";

export interface Section {
    id: number | null;
    price: number | null;
    teacher: Employment | null;
    course: Course | null;
    timestamp: Timestamp | null;
}