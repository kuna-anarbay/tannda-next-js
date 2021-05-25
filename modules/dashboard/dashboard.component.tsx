import Sidebar from "../dashboard-layout/sidebar.component";
import Navbar from "../dashboard-layout/navbar.component";
import CompanyInfoComponent from "../company-info/company-info.component";

export default function Dashboard() {

    return (
        <div className={"flex h-screen w-screen"}>
            <Sidebar/>
            <div className={"w-full"}>
                <Navbar/>
                <div>
                    <CompanyInfoComponent company={{name: "Center name", phones: []}}/>
                </div>
            </div>
        </div>
    )
}
