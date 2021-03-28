import {RequestAction} from '@redux-requests/core';
import {URLPath} from "../http/URLPath";
import {HTTPMethod} from "../http/HTTPMethod";
import {City} from "../../models/City";
import {createAction} from "redux-smart-actions";
import {cityConstants} from "../constants/city.constants";

export class CityAction {

    static getCities = createAction(cityConstants.GET_CITIES, function (): RequestAction<Array<City>> {
        return {
            request: {
                url: URLPath.city.getCities,
                method: HTTPMethod.GET
            }
        }
    });

}

