import {queryRequest} from "../../services/store/http/AxiosInstance";
import {URLPath} from "../../services/store/http/URLPath";
import Category from "./category.entity";

export default class CategoryAction {

    getCategories() {
        return queryRequest<Category[]>("GET_CATEGORIES", {
            method: "GET",
            url: URLPath.category.base
        })
    }

}
