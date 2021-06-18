import {useEffect, useState} from "react";
import {Member, MemberRole, MemberStatus} from "../../models/member";
import {useAppData} from "../app/app-data-provider";
import MemberRowComponent from "./member-row.component";
import AddMemberComponent from "./add-member.component";
import MemberService from "../../services/member.service";
import Spinner from "../util/spinner.component";
import {getIcon, IconType} from "../util/icon";

interface MembersComponentProps {
    courseId: number;
    role: MemberRole;
}

export default function MembersComponent(props: MembersComponentProps) {
    const {courseId} = props;
    const memberService = new MemberService();
    const {showError, showSuccess, cache} = useAppData();
    const [selectedMembers, setSelectedMembers] = useState(Array<Member>());
    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState(Array<Member>());
    const [newMember, setNewMember] = useState(false);

    useEffect(() => {
        getMembers();
    }, [])

    const getMembers = async () => {
        setLoading(true);
        try {
            const members = await memberService.getMembers(courseId);
            cache("members", members);
            setLoading(false);
            setMembers(members);
        } catch (e) {
            setLoading(false);
            showError(e.message);
        }
    }


    const selectMember = (member: Member) => {
        const index = selectedMembers.find(m => m.id === member.id);
        if (index) {
            setSelectedMembers(selectedMembers.filter(m => m.id !== member.id));
        } else {
            setSelectedMembers([...selectedMembers, member]);
        }
    }

    const isMemberSelected = (member: Member): boolean => {
        const value = selectedMembers.find(m => m.id === member.id);
        return !!value;
    }

    const isAllSelected = () => {
        return selectedMembers.length === members.length;
    }

    const selectAll = () => {
        if (isAllSelected()) {
            setSelectedMembers([])
        } else {
            setSelectedMembers(members)
        }
    }

    const deleteMember = async (member: Member) => {
        setMembers(members.filter(m => m.id !== member.id));
        try {
            const message = await memberService.deleteMember(courseId, member.id);
            showSuccess(message);
        } catch (e) {
            setMembers([...members, member]);
            showError(e.message);
        }
    }

    const activateMember = async (member: Member) => {
        const index = members.findIndex(m => m.id === member.id);
        if (!index) {
            return;
        }
        members[index].status = MemberStatus.ACTIVE;
        setMembers(members);
        try {
            const message = await memberService.activateMember(courseId, member.id);
            showSuccess(message);
        } catch (e) {
            members[index].status = member.status;
            setMembers(members);
            showError(e.message);
        }
    }

    const archiveMember = async (member: Member) => {
        const index = members.findIndex(m => m.id === member.id);
        if (!index) {
            return;
        }
        members[index].status = MemberStatus.ARCHIVED;
        setMembers(members);
        try {
            const message = await memberService.archiveMember(courseId, member.id);
            showSuccess(message);
        } catch (e) {
            members[index].status = member.status;
            setMembers(members);
            showError(e.message);
        }
    }

    return (
        <div className="py-6 space-y-3">
            <div className={"grid grid-cols-1 md:grid-cols-3 gap-6"}>
                <div className={"md:col-span-2"}>
                    <div className={"flex justify-between items-center"}>
                        <div>
                            <h3 className={"text-title3 font-medium md:text-title-2"}>
                                Участники
                            </h3>
                        </div>
                        <div className={"flex space-x-2"}>
                            <button className={"btn btn-sm btn-outline"} onClick={() => getMembers()}>
                                {getIcon(IconType.Sync)}
                            </button>
                            <button onClick={() => setNewMember(!newMember)} type={"button"}
                                    className={"btn btn-sm btn-outline"}>
                                Новый участник
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
                                                    className={`btn-checkbox ${isAllSelected() ? "active" : ""}`}>
                                                {isAllSelected() ? getIcon(IconType.Checkmark, "font-bold") : null}
                                            </button>
                                        </th>
                                        <th
                                            scope="col"
                                            className="pr-4 py-2 text-left text-footnote font-normal text-label-secondary tracking-wider"
                                        >
                                            Полное имя
                                        </th>
                                        <th
                                            scope="col"
                                            className="pr-4 py-2 text-left text-footnote font-normal text-label-secondary"
                                        >
                                            Номер телефона
                                        </th>
                                        <th
                                            scope="col"
                                            className="pr-4 py-2 text-left text-footnote font-normal text-label-secondary"
                                        >
                                            Статус
                                        </th>
                                        <th
                                            scope="col"
                                            className="pr-4 py-2 text-left text-footnote font-normal text-label-secondary"
                                        >
                                            Роль
                                        </th>
                                        <th
                                            scope="col"
                                            className="pr-4 py-2 text-left text-footnote font-normal text-label-secondary"
                                        >
                                            Присоединился в
                                        </th>
                                        <th
                                            scope="col"
                                            className="pr-4 py-2 text-left text-footnote font-normal text-label-secondary"
                                        />
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                    {members.map((member) => (
                                        <MemberRowComponent member={member}
                                                            selectMember={selectMember}
                                                            selected={isMemberSelected(member)}
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
            <AddMemberComponent courseId={courseId} open={newMember} reload={() => getMembers()}
                                close={() => setNewMember(!newMember)}/>
        </div>
    )
}
