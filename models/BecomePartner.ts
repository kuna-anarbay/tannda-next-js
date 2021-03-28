import {City} from "./City";
import {Timestamp} from "./Timestamp";
import {Language} from "./Language";
import {ApprovalStatus} from "./ApprovalStatus";

export interface BecomePartner {
    name: string;
    phone: string;
    email: string;
    centerName: string;
    message?: string;
    language: Language;
    city: City;

    id?: number;
    timestamp?: Timestamp;
    approvalStatus?: ApprovalStatus;
}

export declare var ConstructBecomePartner: {
    new(form?: object): BecomePartner;
}