import {ContentStatus} from "./content";
import {MemberRole} from "./member";

export class ContentMember {
    id: number;
    relationId: number;
    firstName: string;
    lastName?: string;
    avatar?: string;
    contentStatus: ContentStatus;
    role?: MemberRole;
}
