import Breadcrumb, {BreadcrumbItem} from "./breadcrumb";
import Text from "./text.component";


interface PageHeaderProps {
    title: string;
    buttonTitle?: string;
    items: BreadcrumbItem[];
    handleClick?: () => void;
}

export default function PageHeader(props: PageHeaderProps) {
    const {title, buttonTitle, items, handleClick} = props;

    return (
        <div className={"space-y-1.5 pt-4 pb-2.5 md:pt-6 md:pb-4"}>
            <div className={"flex justify-between items-center"}>
                <div>
                    <h2 className={"text-title2 font-semibold md:font-bold md:text-title1"}>
                        {title}
                    </h2>
                </div>
                {buttonTitle ? <button onClick={() => handleClick()} type={"button"} className={"btn btm-sm btn-outline"}>
                    {buttonTitle}
                </button> : null}
            </div>
            <Breadcrumb items={items}/>
        </div>
    )
}
