export class Member {
    id: number;
    firstName?: string;
    lastName?: string;
    phone: string;
    avatar?: string;
    status: MemberStatus;
    role: MemberRole;
    note?: string;
}

export enum MemberRole {
    STUDENT = 'student',
    TEACHER = 'teacher',
    MANAGER = 'manager'
}

export const memberRoles = [
    MemberRole.MANAGER,
    MemberRole.STUDENT,
    MemberRole.TEACHER
]

export enum MemberStatus {
    PENDING = 'pending',
    ACTIVE = 'active',
    DISABLED = 'disabled',
    ARCHIVED = 'archived',
    REJECTED = 'rejected'
}

export class AddMemberDto {
    phone: string;
    note?: string;
    role: MemberRole;
}