import {ApprovalStatus} from "./ApprovalStatus";
import {User} from "./User";
import {Timestamp} from "./Timestamp";

export interface Subject {
    id: number | null;
    title: string | null;
    user: User | null;
    approvalStatus: ApprovalStatus | null;
    icon: String | null;
    timestamp: Timestamp | null;
}