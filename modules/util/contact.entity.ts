import {ContactTypeEnum} from "./contact-type.enum";

export default interface Contact {
    type: ContactTypeEnum;
    val: string;
}
