import {useRouter} from "next/router";
import PageHeader from "../../components/page-header";
import CourseCardComponent from "./course-card.component";

export default function CoursesComponent() {
    const {push} = useRouter();

    return (
        <div className={"container mx-auto"}>
            <PageHeader title={"Courses"} buttonTitle={"+ Add course"} handleClick={() => push("/courses/new")} items={[]} />
            <div className={"courses-grid"}>
                { [1, 2, 3, 4, 5].map(() => (
                    <CourseCardComponent />
                ))}
            </div>
        </div>
    )
}