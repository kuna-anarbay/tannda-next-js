import Link from "next/link";
import Course from "./course.entity";

interface CourseCardComponentProps {
    course: Course;
}

export default function CourseCardComponent(props: CourseCardComponentProps) {
    const {course} = props;

    return (
        <Link href={`/courses/${course.id}`}>
            <div className={"course-card"}>
                <div>
                    <h3 className={"course-title"}>
                        {course.title}
                    </h3>
                </div>
                <p className={"course-description"}>
                    {course.description}
                </p>
            </div>
        </Link>
    )
}
