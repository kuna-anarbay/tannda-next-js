import Category from "./category.entity";
import {RequestAction} from "@redux-requests/core";
import {URLPath} from "../../services/store/http/URLPath";
import {HTTPMethod} from "../../services/store/http/HTTPMethod";


export default class CategoryAction {

    getCategories(): RequestAction<Category[]> {
        return {
            type: "getCategories",
            request: {
                url: URLPath.category.base,
                method: HTTPMethod.GET
            }
        }
    }

}
