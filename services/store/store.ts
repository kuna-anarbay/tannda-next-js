import {handleRequests} from '@redux-requests/core';
import {createDriver} from '@redux-requests/axios';
import {applyMiddleware, combineReducers, createStore} from "redux";
import {axiosInstance} from "./http/AxiosInstance";

const {requestsReducer, requestsMiddleware} = handleRequests({
    driver: createDriver(axiosInstance()),
});

const reducers = combineReducers({
    requests: requestsReducer,
});

export const store = createStore(reducers, applyMiddleware(...requestsMiddleware));

