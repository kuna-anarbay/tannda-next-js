import {Content} from "./content.entity";

export default class Section {
    id: number;
    title: string;
    index: number;
}

export class SectionData {
    sections: Section[] = [];
    contents: Content[] = [];
}
