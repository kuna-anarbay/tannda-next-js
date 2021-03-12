import {Timestamp} from "./Timestamp";

export interface Token {
    id: number;
    value: string;
    timestamp: Timestamp;
}