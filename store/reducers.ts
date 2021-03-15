import genericReducer from "./generic.reducer";
import {BecomePartner} from "../models/BecomePartner";
import {authConstants} from "./constants/auth.constants";
import {combineReducers} from "redux";
import {Page} from "../models/Page";
import {City} from "../models/City";
import {cityConstants} from "./constants/city.constants";

const authReducers = {
    becomePartner: genericReducer<BecomePartner>(authConstants.BECOME_PARTNER)
};

const cityReducers = {
    getCities: genericReducer<Page<City>>(cityConstants.GET_CITIES),
    createCity: genericReducer<City>(cityConstants.CREATE_CITY),
    deleteCity: genericReducer<void>(cityConstants.DELETE_CITY),
}


const reducers = {
    auth: combineReducers(authReducers),
    city: combineReducers(cityReducers)
};

export const rootReducer = combineReducers(reducers);

