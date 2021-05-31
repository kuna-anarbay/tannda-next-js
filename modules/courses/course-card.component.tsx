import Link from "next/link";
import Course from "./course.entity";
import Category from "../category/category.entity";

interface CourseCardComponentProps {
    course: Course;
    categories: Category[];
}

export default function CourseCardComponent(props: CourseCardComponentProps) {
    const {course, categories} = props;

    return (
        <Link href={`/courses/${course.id}`}>
            <div className={"course-card"}>
                <div>
                    <h3 className={"course-title"}>
                        {course.title.ru}
                    </h3>
                    <p className={"course-category"}>
                        {categories.find(c => c.id === course.categoryId)?.title.ru.toLowerCase()}
                    </p>
                </div>
                <p className={"course-description"}>
                    {course.description.ru}
                </p>
            </div>
        </Link>
    )
}
