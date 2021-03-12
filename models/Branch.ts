import {City} from "./City";
import {Translatable} from "./Translatable";
import {School} from "./School";
import {Timestamp} from "./Timestamp";
import {Contact} from "./Contact";

export interface Branch {
    id: number | null;
    title: Translatable | null;
    description: string | null;
    tagline: string | null;
    city: City | null;
    address: Translatable | null;
    school: School | null;
    timestamp: Timestamp | null;
    contacts: Array<Contact> | null;
    coursesCount: number | null;
    studentsCount: number | null;
}

// POST
//id
//title
//description | null
//tagline | null
//city
//address
//school
//contacts