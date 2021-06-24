import {Member} from "./member";

export default class Course {
    id: number;
    title: string;
    description?: string;
    member?: Member;
}
