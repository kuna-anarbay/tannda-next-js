import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import axios from 'axios';
import {handleRequests} from '@redux-requests/core';
import {createDriver} from '@redux-requests/axios';
import config from "../../config";

export const configureStore = () => {
    const { requestsReducer, requestsMiddleware } = handleRequests({
        driver: createDriver(
            axios.create({
                baseURL: config.baseURL,
            }),
        )
    });

    const reducers = combineReducers({
        requests: requestsReducer,
    });

    return createStore(reducers, compose(applyMiddleware(...requestsMiddleware)));
};