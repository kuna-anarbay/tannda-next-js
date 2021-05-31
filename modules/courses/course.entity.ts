import {Translatable} from "../util/translatable.entity";

export default class Course {
    id: number;
    title: Translatable;
    categoryId?: number;
    description?: Translatable;
}
