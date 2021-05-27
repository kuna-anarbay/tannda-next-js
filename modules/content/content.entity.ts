import {ResourceType} from "../enum/resource-type.enum";
import {ContentType} from "../enum/content-type.enum";

export default class Content {
    id: number;
    prevId?: number;
    title: string;
    type: ContentType;
    meta: string;
    description?: string;
    resources: [
        {
            title: string,
            type: ResourceType,
            link: string
        }
    ];
    button: {
        title: string,
        link: string
    }
}