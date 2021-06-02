import Breadcrumb, {BreadcrumbItem} from "./breadcrumb";
import Text from "./text.component";


interface PageHeaderProps {
    title: string;
    details?: string;
    buttonTitle?: string;
    items: BreadcrumbItem[];
    handleClick?: () => void;
}

export default function PageHeader(props: PageHeaderProps) {
    const {title, details, buttonTitle, items, handleClick} = props;

    return (
        <div className={"page-header"}>
            <Breadcrumb items={items}/>
            <div className={"page-header-content"}>
                <div>
                    <h2 className={"page-title"}>
                        {title}
                    </h2>
                    {details ? (
                        <Text collapsable={true} className={"page-details"}>
                            {details}
                        </Text>
                    ) : null}
                </div>
                {buttonTitle ? <button onClick={() => handleClick()} type={"button"} className={"page-button"}>
                    {buttonTitle}
                </button> : null}
            </div>
        </div>
    )
}