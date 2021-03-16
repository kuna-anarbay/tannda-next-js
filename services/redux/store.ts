import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {rootReducer} from "./reducers";

const store = configureStore({
    reducer: rootReducer
});

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;