import {RequestAction} from "@redux-requests/core";
import {HTTPMethod} from "../../services/store/http/HTTPMethod";
import Company from "./company.entity";

const constants = {
    UPDATE_COMPANY: "UPDATE_COMPANY"
};

export default {
    updateCompany: (id: number, body: any): RequestAction<Company> => {
        return {
            type: constants.UPDATE_COMPANY,
            request: {
                url: `/company/${id}`,
                method: HTTPMethod.PUT,
                data: body
            }
        }
    }
}
