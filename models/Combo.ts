import {Timestamp} from "./Timestamp";
import {Course} from "./Course";
import {Branch} from "./Branch";

export interface Combo {
    id: number | null;
    courses: Array<Course> | null;
    price: number | null;
    branch: Branch | null;
    timestamp: Timestamp | null;
}