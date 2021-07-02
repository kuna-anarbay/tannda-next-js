import Link from "next/link";
import {GetIcon, IconType} from "../../resources/icon";

export interface BreadcrumbItem {
    title: string;
    path?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb(props: BreadcrumbProps) {
    const {items} = props;

    return (
        <div className={"breadcrumb"}>
            {items.map((item, index) => (
                <BreadcrumbItemComponent key={item.title} title={item.title} path={item.path}
                                         last={items.length === index + 1}/>
            ))}
        </div>
    )
}


interface BreadcrumbItemComponentProps {
    title: string;
    path?: string;
    last: boolean;
}

function BreadcrumbItemComponent(props: BreadcrumbItemComponentProps) {
    const {title, path, last} = props;

    let response;
    if (path && !last) {
        response = (
            <div className={"breadcrumb-item"}>
                <Link href={path}>
                    {title}
                </Link>
            </div>
        );
    } else {
        response = (
            <div className={"breadcrumb-item disabled"}>
                {title}
            </div>
        )
    }

    return (
        <>
            {response}
            {!last ? GetIcon(IconType.ChevronRight, "breadcrumb-divider") : null}
        </>
    );
}
