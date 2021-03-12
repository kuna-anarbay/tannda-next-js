import {Timestamp} from "./Timestamp";
import {User} from "./User";
import {Translatable} from "./Translatable";

export interface School {
    id: number | null;
    title: Translatable;
    tagline: Translatable | null;
    description: Translatable | null;
    admin: User | null
    logo: string | null
    timestamp: Timestamp | null;
}

// POST
//title
//tagline | null
//description | null