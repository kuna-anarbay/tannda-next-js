import Translatable from "../util/translatable.entity";

export default class Category {
    id: number;
    parentId?: number;
    title: Translatable;
}
