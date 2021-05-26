import NewCourseComponent from "../../modules/courses/new-course.component";
import {useEffect, useState} from "react";
import Category from "../../modules/category/category.entity";
import LocalDatabase from "../../services/localDatabase";

export default function NewCoursePage() {
    const [categories, setCategories] = useState(Array<Category>());
    useEffect(() => {
        // setCategories(LocalDatabase.instance.getCategories());
    }, []);

    return <NewCourseComponent categories={categories}/>
}
