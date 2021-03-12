import {Role} from "./Role";

export interface Registration {
    email: string;
    password: string;
    role: Role;
}