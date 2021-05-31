import {mutationRequest, queryRequest} from "../../services/store/http/AxiosInstance";
import {URLPath} from "../../services/store/http/URLPath";
import Course from "./course.entity";
import {CourseReq} from "./dto/course";

export default class CourseAction {

    getCourses() {
        return queryRequest<Course[]>("courses", {
            method: "GET",
            url: URLPath.course.base
        });
    }

    getCourse(id: number) {
        return queryRequest<Course>(["courses", id], {
            method: "GET",
            url: URLPath.course.byId(id)
        });
    }

    createCourse() {
        return mutationRequest<Course, CourseReq>({
            method: "POST",
            url: URLPath.course.base
        })
    }
}
