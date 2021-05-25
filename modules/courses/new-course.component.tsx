import PageHeader from "../../components/page-header";

export default function NewCourseComponent() {


    return (
        <div className={"container mx-auto"}>
            <PageHeader title={"Add course"} items={[
                {
                    title: "Courses",
                    path: "/courses"
                },
                {
                    title: "Add course"
                }
            ]}/>

            <div className={"px-container"}>
                <form className={"form"}>
                    <div>
                        <label className={"block text-caption1 text-label-light"}>
                            Course name
                        </label>
                        <input placeholder={"Course name"}
                               className="input-text"/>
                    </div>
                    <div>
                        <label className={"block text-caption1 text-label-light"}>
                            Course name
                        </label>
                        <textarea placeholder={"Course name"}
                                  className="textarea"/>
                    </div>
                </form>
            </div>
        </div>
    );
}