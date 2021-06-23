import {useEffect, useState} from "react";
import {Member, MemberRole} from "../../models/member";
import {useAppData} from "../app/app-data-provider";
import MemberRowComponent from "./member-row.component";
import Spinner from "../util/spinner.component";
import {getIcon, IconType} from "../util/icon";
import {Content, ContentStatus, ContentStatusCases, contentStatusName} from "../../models/content";
import ContentService from "../../services/content.service";
import PresenceService from "../../services/presence.service";
import {PresenceStatus, presenceStatusCases, presenceStatusName} from "../../models/presence";
import {ContentMember} from "../../models/content-member.";
import Dropdown from "../util/dropdown";

interface MembersComponentProps {
    courseId: number;
    role: MemberRole;
    content: Content;
}

export default function MembersComponent(props: MembersComponentProps) {
    const {courseId, content} = props;
    const presenceService = new PresenceService();
    const contentService = new ContentService();
    const {showError, showSuccess} = useAppData();
    const [selectedMembers, setSelectedMembers] = useState(Array<ContentMember>());
    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState(Array<ContentMember>());
    const [presentMembers, setPresentMembers] = useState(Array<Member>());

    useEffect(() => {
        getMembers();
        getPresence();
    }, [])

    const getMembers = async () => {
        setLoading(true);
        try {
            const members = await contentService.getContentMembers(courseId, content.id);
            console.log(members);
            setLoading(false);
            setMembers(members);
        } catch (e) {
            setLoading(false);
            showError(e.message);
        }
    }

    const getPresence = async () => {
        try {
            const result = await presenceService.getPresence(courseId);
            setPresentMembers(result);
        } catch (e) {
            showError(e.message);
        }
    }


    const selectMember = (member: ContentMember) => {
        const index = selectedMembers.find(m => m.id === member.id);
        if (index) {
            setSelectedMembers(selectedMembers.filter(m => m.id !== member.id));
        } else {
            setSelectedMembers([...selectedMembers, member]);
        }
    }

    const isMemberSelected = (member: ContentMember): boolean => {
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

    const updateStatus = async (status: ContentStatus) => {
        const ids = selectedMembers.filter(m => m.role === MemberRole.STUDENT).map(m => m.id);
        if (ids.length === 0) return;
        const oldData = members;
        setMembers([
            ...members.filter(m => !ids.includes(m.id)),
            ...members.filter(m => ids.includes(m.id)).map(m => {
                return {
                    ...m,
                    contentStatus: status
                }
            })
        ]);

        try {
            const message = await contentService.updateStatus(courseId, content.id, status, ids);
            showSuccess(message);
        } catch (e) {
            setMembers(oldData);
            showError(e.message);
        }
    }


    const updatePresence = async (status: PresenceStatus) => {
        const relations = selectedMembers.filter(m => m.role === MemberRole.STUDENT).map(m => m.relationId);

        if (relations.length === 0) return;
        const oldData = presentMembers;
        setPresentMembers([
            ...presentMembers.filter(m => !relations.includes(m.relationId)),
            ...presentMembers.filter(m => relations.includes(m.relationId)).map(m => {
                return {
                    ...m,
                    presence: status,
                    presenceDate: new Date()
                }
            })
        ]);
        try {
            const message = await presenceService.postPresence(courseId, {
                status, relations, note: "Some note"
            });
            showSuccess(message);
        } catch (e) {
            setPresentMembers(oldData);
            showError(e.message);
        }
    }

    const getPresenceStatus = (contenMember: ContentMember) => {
        const member = presentMembers.find(p => p.id === contenMember.id);
        if (!member) return {status: null, note: null, date: null};
        return {
            status: member.presence,
            note: member.presenceNote,
            date: member.presenceDate
        }
    }

    const sortedMembers = () => {
        let indexes = {
            [MemberRole.OWNER]: 0,
            [MemberRole.MANAGER]: 1,
            [MemberRole.TEACHER]: 2,
            [MemberRole.STUDENT]: 3,
        }
        return members.sort((a, b) => indexes[a.role] - indexes[b.role]);
    }

    const buttonsAvailable = () => {
        const ids = selectedMembers.filter(m => m.role === MemberRole.STUDENT).map(m => m.id);
        return ids.length > 0;
    }


    const reload = () => {
        getMembers();
        getPresence();
    }

    return (
        <div className="py-6 space-y-3">
            <div className={"flex justify-between items-center"}>
                <div>
                    <h3 className={"text-title3 font-medium md:text-title-2"}>
                        Участники
                    </h3>
                </div>
                <div className={"flex items-center space-x-2"}>
                    <button className={"btn btn-outline"} onClick={() => reload()}>
                        {getIcon(IconType.Sync)}
                    </button>
                    {buttonsAvailable() ? (
                        <Dropdown title={"Обновить посещаемость"} children={presenceStatusCases.map(status => {
                            return {
                                title: presenceStatusName(status),
                                action: () => updatePresence(status)
                            }
                        })}/>
                    ) : null}
                    {buttonsAvailable() ? (
                        <Dropdown title={"Обновить доступность"} children={ContentStatusCases.map(status => {
                            return {
                                title: contentStatusName(status),
                                action: () => updateStatus(status)
                            }
                        })}/>
                    ) : null}
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
                                    Роль
                                </th>
                                <th
                                    scope="col"
                                    className="pr-4 py-2 text-left text-footnote font-normal text-label-secondary"
                                >
                                    Статус урока
                                </th>
                                <th
                                    scope="col"
                                    className="pr-4 py-2 text-left text-footnote font-normal text-label-secondary"
                                >
                                    Статус посещения
                                </th>
                                <th
                                    scope="col"
                                    className="pr-4 py-2 text-left text-footnote font-normal text-label-secondary"
                                >
                                    Оценка
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                            {sortedMembers().map((member) => (
                                <MemberRowComponent
                                    presence={getPresenceStatus(member)}
                                    member={member}
                                    selectMember={selectMember}
                                    selected={isMemberSelected(member)}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
