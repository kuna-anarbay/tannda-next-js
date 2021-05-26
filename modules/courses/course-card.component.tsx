import Link from "next/link";

export default function CourseCardComponent() {

    return (
        <Link href={"/courses/1"}>
            <div className={"course-card"}>
                <div>
                    <h3 className={"course-title"}>
                        Web development
                    </h3>
                    <p className={"course-category"}>
                        software
                    </p>
                </div>
                <p className={"course-description"}>
                    If you want to add an additional small breakpoint, you can’t use extend because the small breakpoint would be added to the end of the breakpoint list.
                </p>
            </div>
        </Link>
    )
}
