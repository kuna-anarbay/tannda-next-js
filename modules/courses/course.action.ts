import {RequestAction} from "@redux-requests/core";
import Course from "./course.entity";
import {URLPath} from "../../services/store/http/URLPath";
import {HTTPMethod} from "../../services/store/http/HTTPMethod";

export default class CourseAction {

    getCourses(): RequestAction<Course[]> {
        return {
            type: "getCourses",
            request: {
                url: URLPath.course.base,
                method: HTTPMethod.GET
            }
        }
    }

    createCourse(data: any): RequestAction<Course> {
        return {
            type: "createCourse",
            request: {
                url: URLPath.course.base,
                method: HTTPMethod.POST,
                data: data
            }
        }
    }
}