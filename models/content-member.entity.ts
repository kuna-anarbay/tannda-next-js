import {ContentStatus} from "./content.entity";
import {Member, MemberRole} from "./member.entity";
import {Presence} from "./presence.entity";
import {Grade} from "./grade.entity";
import {Submission} from "./submission.entity";

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
