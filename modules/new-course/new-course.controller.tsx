import {useState} from "react";
import NewCourseService from "./new-course.service";
import {useAppData} from "../app/app-data-provider";
import {NewCourseRequestDto} from "./new-course.dto";
import {useRouter} from "next/router";
import {Route} from "../app/route";
import NewCourseView from "./new-course.view";

interface NewCourseControllerProps {

}

export default function NewCourseController(props: NewCourseControllerProps) {
    const newCourseService = new NewCourseService();
    const {showError, validate} = useAppData();
    const {push} = useRouter();
    const [loading, setLoading] = useState(false);

    const createCourse = async (body: NewCourseRequestDto) => {
        setLoading(true);
        try {
            await validate(body);
            await newCourseService.createCourse(body);
            setLoading(false);
            await push(Route.courses.my);
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    }


    return <NewCourseView loading={loading} createCourse={createCourse}/>
}
