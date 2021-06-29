import {MemberEntity} from "./member.entity";

export default class Course {
    id: number;
    title: string;
    description?: string;
    member?: MemberEntity;
}
