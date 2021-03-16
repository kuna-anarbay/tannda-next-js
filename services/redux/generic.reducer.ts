import {defaultState, GenericState} from "../../generic/generic.state";
import {FailureAction, GenericAction, SuccessAction} from "../../generic/generic.action";

const genericReducer = <T>(type: string) => {
    return (state: GenericState<T> = defaultState, action: GenericAction<T>) => {
        let result: GenericState<T>
        switch (action.type) {
            case `${type}_REQUEST`:
                result = {
                    loading: true,
                    error: null,
                    response: null
                }
                break;
            case `${type}_SUCCESS`:
                result = {
                    loading: false,
                    error: null,
                    response: (action as SuccessAction<T>).response
                }
                break;
            case `${type}_FAILURE`:
                result = {
                    loading: false,
                    error: (action as FailureAction).error,
                    response: null
                }
                break;
            default:
                result = state;
        }
        return result;
    };
}

export default genericReducer;