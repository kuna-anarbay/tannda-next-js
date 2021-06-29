export class Presence {
    status: PresenceStatus;
    note?: string;
    updatedAt: Date;
}

export enum PresenceStatus {
    PRESENT = "present",
    ABSENT = "absent",
    ILL = "ill",
    TIME_OFF = "time_off"
}

export const presenceStatusCases: PresenceStatus[] = [
    PresenceStatus.PRESENT,
    PresenceStatus.ABSENT,
    PresenceStatus.ILL,
    PresenceStatus.TIME_OFF
]

export const presenceStatusName = (status: PresenceStatus): string => {
    switch (status) {
        case PresenceStatus.PRESENT:
            return "Присутствует";
        case PresenceStatus.ABSENT:
            return "Отсутствует";
        case PresenceStatus.ILL:
            return "Заболел";
        case PresenceStatus.TIME_OFF:
            return "Отпросился";
        default:
            return null;
    }
}
