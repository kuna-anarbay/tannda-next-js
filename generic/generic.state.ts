import {ErrorResponse} from "../models/ErrorResponse";

export interface GenericState<T> {
    loading: boolean;
    error: ErrorResponse | null;
    response: T | null;
}

export const defaultState = {
    loading: false,
    response: null,
    error: null
}