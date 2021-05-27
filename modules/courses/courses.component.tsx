import {useRouter} from "next/router";
import PageHeader from "../util/page-header";
import CourseCardComponent from "./course-card.component";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import CourseAction from "./course.action";
import {Query} from "@redux-requests/react";
import StateView from "../util/state-view";
import {IconType} from "../../util/icon";

export default function CoursesComponent() {
    const {push} = useRouter();
    const dispatch = useDispatch();
    const courseAction = new CourseAction();

    useEffect(() => {
        dispatch(courseAction.getCourses());
    }, []);

    return (
        <div className={"container mx-auto"}>
            <PageHeader title={"Courses"} buttonTitle={"+ Add course"} handleClick={() => push("/courses/new")}
                        items={[]}/>
            <div className={"px-container"}>
                <Query
                    type={courseAction.getCourses}
                    loadingComponent={StateView}
                    loadingComponentProps={{title: "Fetching courses", icon: IconType.Warning}}
                    errorComponent={StateView}
                    errorComponentProps={{ title: "Failed to fetch courses", icon: IconType.Warning}}
                    noDataMessage={<StateView title={"Courses not found"} icon={IconType.Search} />}
                >
                    {
                        ({data}) => (
                            data.map(course => (
                                <CourseCardComponent key={course.id} course={course}/>
                            ))
                        )
                    }
                </Query>
            </div>
        </div>
    )
}