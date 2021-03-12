import {FileType} from "./FileType";
import {User} from "./User";
import {Timestamp} from "./Timestamp";

export interface File {
    id: string | null,
    title: string | null,
    fileType: FileType | null,
    typeId: number | null,
    size: number | null,
    contentType: string | null,
    author: User | null,
    timestamp: Timestamp | null,
}