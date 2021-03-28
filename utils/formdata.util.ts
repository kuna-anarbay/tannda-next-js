export interface FormBody {
    [name: string]: any;
}


export declare var FormBody: {
    new(form?: HTMLFormElement): FormBody;
}

export default function getFormBody(form: HTMLFormElement) {
    return new FormBody(form);
}