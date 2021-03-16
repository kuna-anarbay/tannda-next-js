import {AxiosResponse} from "axios";
import {AppThunk} from "./store";

export const GenericRequest = <T>(request: Promise<AxiosResponse<T>>, type: string): AppThunk => async dispatch => {
    dispatch({type: `${type}_REQUEST`})
    request.then(response => {
        dispatch({type: `${type}_SUCCESS`, response: response});
    }).catch(error => {
        dispatch({type: `${type}_FAILURE`, error: error.response.data});
    });
}