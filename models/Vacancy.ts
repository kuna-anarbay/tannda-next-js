import {Branch} from "./Branch";
import {Language} from "./Language";
import {Contact} from "./Contact";
import {Subject} from "./Subject";

export interface Vacancy {
    id: number | null;
    title: string | null;
    branch: Branch | null;
    instructionLanguage: Language | null;
    gradeMin: number | null;
    gradeMax: number | null;
    subject: Subject | null;
    contacts: Array<Contact> | null;
}