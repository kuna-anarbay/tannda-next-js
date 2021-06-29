import {bytesToSize, Resource} from "../../models/resource";
import {resourceIcon} from "./resource.icon";
import {GetIcon, IconType} from "../util/icon";

interface ResourceCellProps {
    resource: Resource;
    remove?: (Resource) => void;
}

export default function ResourceCell(props: ResourceCellProps) {
    const {resource, remove} = props;

    return (
        <div className={"block flex justify-between items-center cursor-pointer"}>
            <a href={resource.url} target={"_blank"} className={"flex items-center space-x-3 "}>
                <div>
                    <img className={"h-10 w-8"}
                         src={resourceIcon(resource.originalName)}/>
                </ div>
                <div>
                    <p className={"text-footnote text-label"}>
                        {resource.originalName}
                    </p>
                    <p className={"text-caption1 text-label-secondary"}>
                        {bytesToSize(resource.size)}
                    </p>
                </div>
            </a>
            {remove ? (
                <div onClick={() => remove(resource)} className={"rounded-full p-1 bg-background-secondary"}>
                    {GetIcon(IconType.XMark, "text-footnote text-red")}
                </div>
            ) : null}
        </div>
    )
}
