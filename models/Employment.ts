import {Timestamp} from "./Timestamp";
import {Profile} from "./Profile";
import {Branch} from "./Branch";

export interface Employment {
    id: number | null;
    branch: Branch | null;
    employee: Profile | null;
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
    avatar: string | null;
    experience: string | null;
    description: string | null;
    timestamp: Timestamp | null;
}