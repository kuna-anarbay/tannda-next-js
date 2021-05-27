import Breadcrumb, {BreadcrumbItem} from "./breadcrumb";


interface PageHeaderProps {
    title: string;
    buttonTitle?: string;
    items: BreadcrumbItem[];
    handleClick?: () => void;
}

export default function PageHeader(props: PageHeaderProps) {
    const {title, buttonTitle, items, handleClick} = props;

    return (
        <div className={"page-header"}>
            <Breadcrumb items={items}/>
            <div className={"page-header-content"}>
                <h2 className={"page-title"}>
                    {title}
                </h2>
                {buttonTitle ? <button onClick={() => handleClick()} type={"button"} className={"page-button"}>
                    {buttonTitle}
                </button> : null}
            </div>
        </div>
    )
}