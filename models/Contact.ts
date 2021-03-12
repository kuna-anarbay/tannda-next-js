import {ContactType} from "./ContactType";

export interface Contact {
    id: number | null;
    type: ContactType | null;
    value: string | null;
    description: string | null;
}