import {City} from "./City";
import {Timestamp} from "./Timestamp";
import {Language} from "./Language";
import {ApprovalStatus} from "./ApprovalStatus";

export interface BecomePartner {
    id: number | null;
    name: String;
    phone: String;
    email: String;
    centerName: String;
    message: String | null;
    language: Language;
    city: City;
    timestamp: Timestamp | null;
    approvalStatus: ApprovalStatus | null;
}

////////// POST
// name
// phone
// email
// centerName
// message | null
// language
// city