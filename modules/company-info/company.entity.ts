import Contact from "../util/contact.entity";

export default interface Company {
    name: string;
    avatar?: string;
    phones: Contact[];
}
