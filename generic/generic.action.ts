import {ErrorResponse} from "../models/ErrorResponse";

export type RequestAction = {
    readonly type: string;
};

export type SuccessAction<T> = {
    readonly type: string;
    readonly response: T;
};

export type FailureAction = {
    readonly type: string;
    readonly error: ErrorResponse;
};

export type GenericAction<T> = RequestAction | SuccessAction<T> | FailureAction;