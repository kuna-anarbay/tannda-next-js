import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {handleRequests} from '@redux-requests/core';
import {createDriver} from '@redux-requests/axios';
import {axiosInstance} from "./http/AxiosInstance";

export const configureStore = () => {
    const {requestsReducer, requestsMiddleware} = handleRequests({
        driver: createDriver(axiosInstance())
    });

    const reducers = combineReducers({
        requests: requestsReducer,
    });

    return createStore(reducers, compose(applyMiddleware(...requestsMiddleware)));
};
