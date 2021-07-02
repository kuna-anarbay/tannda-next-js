import {strings} from "../../resources/strings";
import {Route} from "../app/route";

export const layoutData = {
    navbarItems: [
        {
            path: Route.about.base,
            title: strings.aboutUs,
        }
    ],
    loginItems: [
        {
            path: Route.courses.my,
            title: strings.courses
        }
    ]
}
