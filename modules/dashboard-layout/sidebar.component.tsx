import r from "../../util/r";
import {getIcon, IconType} from "../../util/icon";

export default function Sidebar() {

    return (
        <div className={"w-96 hidden md:block"}>
            <div className={"fixed inset-0 w-75 bg-sidebar h-screen overflow-hidden"}>
                <div className={"px-5 flex items-center h-12 py-3 border-b border-divider-light border-opacity-20"}>
                    <img className={"h-full"} src={r.image.logoTextWhite.val} alt={r.image.logoTextWhite.alt}/>
                </div>
                <div className={"py-3 space-y-1"}>
                    {r.data.dashboardSidebar.map(item => (
                        <div className={"flex items-center justify-between px-5 py-3 text-white text-opacity-80 font-medium hover:text-highlight hover:bg-sidebar-light"} key={item}>
                            <p>
                                {item}
                            </p>
                            <div className={"p-0.5 border rounded-xl border-divider-light text-center border-opacity-20"}>
                                {getIcon(IconType.ChevronRight, "text-caption1 text-center")}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
