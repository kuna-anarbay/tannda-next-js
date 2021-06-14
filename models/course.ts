import {Member, MemberRole} from "./member";

export default class Course {
    id: number;
    title: string;
    description?: string;
    member?: Member;
}

export class CourseRes {
    course: Course;
    role: MemberRole;
}
