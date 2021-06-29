import {GetIcon, IconType} from "../util/icon";
import Avatar from "../util/avatar";
import {
    getRoleName,
    getStatusColor,
    getStatusName,
    isActivatable,
    isArchievable, isDeletable, Member,
    MemberRole
} from "../../models/member";
import {getDate} from "../util/date";

interface CourseMemberRowProps {
    member: Member;
    isSelected: boolean;
    selectMember: (member: Member) => void;
    activateMember: (member: Member) => void;
    archiveMember: (member: Member) => void;
    deleteMember: (member: Member) => void;
}

export default function CourseMemberRow(props: CourseMemberRowProps) {
    const {member, selectMember, isSelected, activateMember, archiveMember, deleteMember} = props;


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
                        {member.id ? `${member.firstName} ${member.lastName}` : "Пользователь не найден"}
                    </div>
                </div>
            </td>
            <td className="pr-4 py-1 whitespace-nowrap">
                <div className="text-footnote">
                    {member.phone}
                </div>
            </td>
            <td className="pr-4 py-1 whitespace-nowrap">
                <a className={`text-${getStatusColor(member.status)} bg-${getStatusColor(member.status)} ` + " bg-opacity-10 px-2 py-0.5 text-caption1 inline-flex rounded-1.5 bg-green-100 text-green-800"}>
                    {getStatusName(member.status)}
                </a>
            </td>
            <td className="pr-4 py-1 whitespace-nowrap text-footnote">
                {getRoleName(member.role)}
            </td>
            <td className="pr-4 py-1 whitespace-nowrap text-footnote">
                {getDate(member.joinedAt, "MMMM D YYYY, HH:mm")}
            </td>
            <td className="pr-4 py-1 whitespace-nowrap">
                {member.role === MemberRole.OWNER ? null : (
                    <div className={"flex items-center space-x-2"}>
                        {isActivatable(member.status) ? (
                            <button onClick={() => activateMember(member)} className={"btn btn-xs btn-outline"}>
                                Activate
                            </button>
                        ) : null}
                        {isArchievable(member.status) ? (
                            <button onClick={() => archiveMember(member)}
                                    className={"btn btn-xs btn-outline btn-warning"}>
                                Archive
                            </button>
                        ) : null}
                        {isDeletable(member.status) ? (
                            <button onClick={() => deleteMember(member)}
                                    className={"btn btn-xs btn-outline btn-danger"}>
                                Delete
                            </button>
                        ) : null}
                    </div>
                )}
            </td>
        </tr>
    )
}
