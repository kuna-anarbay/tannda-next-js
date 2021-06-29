import {ContentStatus} from "./content";
import {Member, MemberRole} from "./member";
import {Presence} from "./presence";
import {Grade} from "./grade";
import {Submission} from "./submission";

export class ContentMember {
    id: number;
    relationId: number;
    firstName: string;
    lastName?: string;
    avatar?: string;
    contentStatus: ContentStatus;
    role?: MemberRole;
    presence?: Presence;
    grade?: Grade;
    submission?: Submission;

    constructor(member: Member) {
        this.id = member.id;
        this.firstName = member.firstName;
        this.lastName = member.lastName;
        this.avatar = member.avatar;
        this.role = member.role;
    }
}
