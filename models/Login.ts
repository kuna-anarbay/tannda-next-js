export interface Login {
    email: string;
    password: string;
}


export class Login {
    email: string;
    password: string;

    constructor(form: HTMLFormElement) {
        const formData = new FormData(form);
        this.email = formData["email"];
        this.password = formData["password"];
    }
}