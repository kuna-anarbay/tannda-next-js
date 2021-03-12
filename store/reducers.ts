import genericReducer from "./generic.reducer";
import {BecomePartner} from "../models/BecomePartner";
import {authConstants} from "./constants/auth.constants";
import {combineReducers} from "redux";

const authReducers = {
    becomePartner: genericReducer<BecomePartner>(authConstants.BECOME_PARTNER)
};

const reducers = {
    auth: combineReducers(authReducers),
};

export const rootReducer = combineReducers(reducers);

