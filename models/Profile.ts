import {Timestamp} from "./Timestamp";

export interface Profile {
    id: number | null;
    firstName: string;
    lastName: string | null;
    middleName: string | null;
    avatar: string | null;
    birthday: string | null;
    timestamp: Timestamp | null;
}