import {Content} from "./content";

export default class Section {
    id: number;
    title: string;
    index: number;
}

export class SectionData {
    sections: Section[] = [];
    contents: Content[] = [];
}