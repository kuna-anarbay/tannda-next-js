import NewCourseComponent from "../../modules/courses/new-course.component";
import PageHeader from "../../modules/util/page-header";

export default function NewCoursePage() {
    return (
        <div>
            <div className={"container mx-auto px-4 md:px-0"}>
                <PageHeader title={"Новый курс"} items={[
                    {
                        title: "Курсы",
                        path: "/courses"
                    },
                    {
                        title: "Новый курс"
                    }
                ]}/>
            </div>
            <NewCourseComponent/>
        </div>
    );
}
