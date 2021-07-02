import {getRoleName} from "../../models/member.entity";
import Avatar from "../util/avatar";
import {ContentMember} from "../../models/content-member.entity";
import {GetIcon, IconType} from "../../resources/icon";
import {ContentStatus, contentStatusName} from "../../models/content.entity";
import {getDate} from "../../helpers/date";
import {presenceStatusName} from "../../models/presence.entity";

interface ContentMemberRowProps {
    isLesson: boolean;
    member: ContentMember;
    isSelected: boolean;
    selectMember: (member: ContentMember) => void;
}

export default function ContentMemberRow(props: ContentMemberRowProps) {
    const {member, selectMember, isSelected, isLesson} = props;

    return (
        <tr key={member.id}
            className={"hover:bg-light cursor-pointer border-b border-border"}>
            <td className="pr-4 py-1 whitespace-nowrap">
                <button onClick={() => selectMember(member)} className={`btn-checkbox ${isSelected ? "active" : ""}`}>
                    {isSelected ? GetIcon(IconType.Checkmark, "font-bold") : null}
                </button>
            </td>
            <td className="pr-4 py-1 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                        <Avatar src={member.avatar} className={"h-8 w-8"}/>
                    </div>
                    <div className="ml-3 text-footnote">
                        {member.firstName} {member.lastName}
                    </div>
                </div>
            </td>
            <td className="pr-4 py-1 whitespace-nowrap">
                <a className={"border border-border bg-opacity-10 px-2 py-0.5 text-caption1 inline-flex rounded-1.5 bg-green-100 text-green-800"}>
                    {contentStatusName(member.contentStatus ?? ContentStatus.HIDDEN)}
                </a>
            </td>
            <td className="pr-4 py-1 whitespace-nowrap text-footnote">
                <p className={"font-medium"}>
                    {presenceStatusName(member?.presence?.status)}
                </p>
                <p className={"text-caption1 text-label-secondary"}>
                    {getDate(member?.presence?.updatedAt, "D MMM, HH:mm")} • {member?.presence?.note}
                </p>
            </td>
            { isLesson || (
                <td className="pr-4 py-1 whitespace-nowrap text-footnote">
                    <p className={"font-medium"}>
                        {member?.grade?.points ?? "Not set"}
                    </p>
                    <p className={"text-caption1 text-label-secondary"}>
                        {getDate(member?.grade?.updatedAt, "D MMM, HH:mm")} • {member?.grade?.note}
                    </p>
                </td>
            )}
            { isLesson || (
                <td className="pr-4 py-1 whitespace-nowrap text-footnote">
                    <p className={"font-medium"}>
                        {member?.submission?.submittedAt ?? "Not set"}
                    </p>
                    <p className={"text-caption1 text-label-secondary"}>
                        {getDate(member?.submission?.availableFrom, "D MMM, HH:mm")} - {getDate(member?.submission?.availableTo, "D MMM, HH:mm")}
                    </p>
                </td>
            )}
        </tr>
    )
}
