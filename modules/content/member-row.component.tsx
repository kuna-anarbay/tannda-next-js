import {getRoleName} from "../../models/member";
import Avatar from "../util/avatar";
import {getIcon, IconType} from "../util/icon";
import {PresenceStatus, presenceStatusName} from "../../models/presence";
import {ContentMember} from "../../models/content-member.";
import {contentStatusName} from "../../models/content";
import {getDate} from "../util/date";

interface MemberRowComponentProps {
    member: ContentMember;
    selected: boolean;
    selectMember: (Member) => void;
    presence?: {
        status: PresenceStatus;
        note: string;
        date: Date;
    };
    grade?: number;
}

export default function MemberRowComponent(props: MemberRowComponentProps) {
    const {member, selectMember, selected, presence, grade} = props;

    return (
        <tr key={member.id}
            className={"hover:bg-light cursor-pointer border-b border-border"}>
            <td className="pr-4 py-1 whitespace-nowrap">
                <button onClick={() => selectMember(member)} className={`btn-checkbox ${selected ? "active" : ""}`}>
                    {selected ? getIcon(IconType.Checkmark, "font-bold") : null}
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
            <td className="pr-4 py-1 whitespace-nowrap text-footnote">
                {getRoleName(member.role)}
            </td>
            <td className="pr-4 py-1 whitespace-nowrap">
                {member.contentStatus ? (
                    <a className={"border border-border bg-opacity-10 px-2 py-0.5 text-caption1 inline-flex rounded-1.5 bg-green-100 text-green-800"}>
                        {contentStatusName(member.contentStatus)}
                    </a>
                ) : null}
            </td>
            <td className="pr-4 py-1 whitespace-nowrap text-footnote">
                <p className={"font-medium"}>
                    {presenceStatusName(presence.status)}
                </p>
                <p className={"text-caption1 text-label-secondary"}>
                    {getDate(presence.date, "D MMM, HH:mm")} • {presence.note}
                </p>
            </td>
            <td className="pr-4 py-1 whitespace-nowrap text-footnote">
                {grade}
            </td>
        </tr>
    )
}
