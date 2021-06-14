import CoursesComponent from "../../modules/courses/courses.component";
import {isManager} from "../../models/role";
import PageHeader from "../../modules/util/page-header";
import {useRouter} from "next/router";
import {useAppData} from "../../modules/app/app-data-provider";

export default function CoursesPage() {
    const {push} = useRouter();
    const {role} = useAppData();

    return (
        <div>
            <div  className={"container mx-auto px-4 md:px-0"}>

            </div>
            <CoursesComponent/>
        </div>
    );
}
