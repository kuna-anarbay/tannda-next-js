import {Role} from "./Role";
import {Timestamp} from "./Timestamp";

export interface User {
    id: number | null;
    email: string | null,
    role: Role | null,
    timestamp: Timestamp | null
}