import PageHeader from "../../components/page-header";
import {CoursePageProps} from "../../pages/courses/[id]";

export default function CourseComponent(props: CoursePageProps) {

    return (
        <div className={"container mx-auto"}>
            <PageHeader title={"Web development"} items={[
                {
                    title: "Courses",
                    path: "/courses"
                },
                {
                    title: "Web development"
                }
            ]}/>

            <div className={"px-container"}>
                { props.id}
            </div>
        </div>
    )
}