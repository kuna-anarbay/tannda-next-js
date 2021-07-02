import {Member} from "../../models/member.entity";
import {GetIcon, IconType} from "../../resources/icon";
import Spinner from "../util/spinner.component";
import {strings} from "../../resources/strings";
import CourseMemberRow from "./course-member.row";

interface CourseMembersViewProps {
    members: Member[];
    refresh: () => void;
    loading: boolean;
    isAllSelected: boolean;
    isSelected: (member: Member) => boolean;
    selectAll: () => void;
    selectMember: (member: Member) => void;
    activateMember: (member: Member) => void;
    archiveMember: (member: Member) => void;
    deleteMember: (member: Member) => void;
    addNewMember: () => void;
}

export default function CourseMembersView(props: CourseMembersViewProps) {
    const {
        members,
        selectAll,
        refresh,
        isAllSelected,
        loading,
        activateMember,
        addNewMember,
        archiveMember,
        deleteMember,
        isSelected,
        selectMember
    } = props;


    return (
        <div className="py-6 space-y-3">
            <div className={"grid grid-cols-1 md:grid-cols-3 gap-6"}>
                <div className={"md:col-span-2"}>
                    <div className={"flex justify-between items-center"}>
                        <div>
                            <h3 className={"text-title3 font-medium md:text-title-2"}>
                                {strings.members}
                            </h3>
                        </div>
                        <div className={"flex space-x-2"}>
                            <button className={"btn btn-sm btn-outline"} onClick={refresh}>
                                {GetIcon(IconType.Sync)}
                            </button>
                            <button onClick={addNewMember} type={"button"}
                                    className={"btn btn-sm btn-outline"}>
                                {strings.addMember}
                            </button>
                        </div>
                    </div>
                    {loading ? <Spinner/> : null}
                    <div className="overflow-x-auto mt-3">
                        <div className="align-middle inline-block min-w-full">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead>
                                    <tr className={"border-b border-border"}>
                                        <th
                                            scope="col"
                                            className="pr-4 py-2 text-left text-footnote font-normal text-label-secondary tracking-tight w-2"
                                        >
                                            <button onClick={() => selectAll()}
                                                    className={`btn-checkbox ${isAllSelected ? "active" : ""}`}>
                                                {isAllSelected ? GetIcon(IconType.Checkmark, "font-bold") : null}
                                            </button>
                                        </th>
                                        <th
                                            scope="col"
                                            className="pr-4 py-2 text-left text-footnote font-normal text-label-secondary tracking-wider"
                                        >
                                            {strings.fullName}
                                        </th>
                                        <th
                                            scope="col"
                                            className="pr-4 py-2 text-left text-footnote font-normal text-label-secondary"
                                        >
                                            {strings.phoneNumber}
                                        </th>
                                        <th
                                            scope="col"
                                            className="pr-4 py-2 text-left text-footnote font-normal text-label-secondary"
                                        >
                                            {strings.status}
                                        </th>
                                        <th
                                            scope="col"
                                            className="pr-4 py-2 text-left text-footnote font-normal text-label-secondary"
                                        >
                                            {strings.role}
                                        </th>
                                        <th
                                            scope="col"
                                            className="pr-4 py-2 text-left text-footnote font-normal text-label-secondary"
                                        >
                                            {strings.joinedAt}
                                        </th>
                                        <th
                                            scope="col"
                                            className="pr-4 py-2 text-left text-footnote font-normal text-label-secondary"
                                        />
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                    {members.map((member) => (
                                        <CourseMemberRow member={member}
                                                         selectMember={selectMember}
                                                         isSelected={isSelected(member)}
                                                         deleteMember={deleteMember}
                                                         activateMember={activateMember}
                                                         archiveMember={archiveMember}
                                        />
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
