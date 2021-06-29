export class MemberEntity {
    id: number;
    relationId: number;
    firstName?: string;
    lastName?: string;
    phone: string;
    avatar?: string;
    status: MemberStatus;
    role: MemberRole;
    joinedAt?: Date;
}

export class AddMemberDto {
    phone: string;
    role: MemberRole;
}


/**
 *  MEMBER ROLES
 */
export enum MemberRole {
    OWNER = "owner",
    STUDENT = 'student',
    TEACHER = 'teacher',
    MANAGER = 'manager'
}

export const memberRoles = [
    MemberRole.MANAGER,
    MemberRole.STUDENT,
    MemberRole.TEACHER
]

export const getRoleName = (role: MemberRole): string => {
    const roleLocale = {
        "manager": "Менеджер",
        "student": "Ученик",
        "teacher": "Учитель",
        "owner": "Владелец"
    }

    return roleLocale[role];
}


/**
 *  MEMBER STATUS
 */
export enum MemberStatus {
    PENDING = 'pending',
    ACTIVE = 'active',
    ARCHIVED = 'archived',
    REJECTED = 'rejected'
}

export const isActivatable = (status: MemberStatus) => {
    return status === MemberStatus.ARCHIVED;
}

export const isArchievable = (status: MemberStatus) => {
    return status === MemberStatus.ACTIVE;
}

export const isDeletable = (status: MemberStatus) => {
    return status !== MemberStatus.REJECTED;
}

export const getStatusName = (status: MemberStatus): string => {
    const statusLocale = {
        "pending": "В ожидании",
        "active": "Активный",
        "archived": "В архиве",
        "rejected": "Отклоненный"
    }

    return statusLocale[status];
}

export const getStatusColor = (status: MemberStatus): string => {
    const statusColor = {
        "pending": "gray",
        "active": "primary",
        "archived": "orange",
        "rejected": "red"
    }

    return statusColor[status];
}
