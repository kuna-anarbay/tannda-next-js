import {Member} from "./member.entity";

export default class Course {
    id: number;
    title: string;
    description?: string;
    member?: Member;
}
