import {RequestAction} from "@redux-requests/core";
import Content from "./content.entity";
import {URLPath} from "../../services/store/http/URLPath";
import {HTTPMethod} from "../../services/store/http/HTTPMethod";

export default class ContentAction {

    getContents(courseId: number): RequestAction<Content[]> {
        return {
            type: "getContents",
            request: {
                url: URLPath.content.base(courseId),
                method: HTTPMethod.GET
            }
        }
    }

}