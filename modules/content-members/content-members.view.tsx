import {GetIcon, IconType} from "../util/icon";
import ContentMemberRow from "./content-member.row";
import {ContentMember} from "../../models/content-member";
import {ContentStatus, ContentStatusCases, contentStatusName} from "../../models/content";
import Dropdown from "../util/dropdown";

interface ContentMembersViewProps {
    members: ContentMember[];
    canEdit: boolean;
    isLesson: boolean;
    reload: () => void;
    selectAll: () => void;
    isAllSelected: boolean;
    loading: boolean;
    isSelected: (member: ContentMember) => boolean;
    selectMember: (member: ContentMember) => void;
    updateStatus: (status: ContentStatus) => void;
    updatePresence: () => void;
    updateSubmission: () => void;
}

export default function ContentMembersView(props: ContentMembersViewProps) {
    const {
        members,
        canEdit,
        isAllSelected,
        isLesson,
        selectAll,
        reload,
        updateStatus,
        loading,
        selectMember,
        isSelected,
        updatePresence,
        updateSubmission
    } = props;

    return (
        <div className="py-6 space-y-3">
            <div className={"flex justify-between items-center"}>
                <div>
                    <h3 className={"text-title3 font-medium md:text-title-2"}>
                        Участники
                    </h3>
                </div>
                <div className={"flex items-center space-x-2"}>
                    <button className={"btn btn-outline"} onClick={reload}>
                        {GetIcon(IconType.Sync, loading ? "animate-spin" : null)}
                    </button>
                    <button className={"btn btn-sm btn-outline"} onClick={updatePresence}>
                        Update presence
                    </button>
                    <button className={"btn btn-sm btn-outline"} onClick={updateSubmission}>
                        Update submission
                    </button>
                    {/*{canEdit ? (*/}
                    {/*    <Dropdown title={"Обновить посещаемость"} children={presenceStatusCases.map(status => {*/}
                    {/*        return {*/}
                    {/*            title: presenceStatusName(status),*/}
                    {/*            action: () => updatePresence(status)*/}
                    {/*        }*/}
                    {/*    })}/>*/}
                    {/*) : null}*/}
                    {canEdit ? (
                        <Dropdown title={"Обновить доступность"} children={ContentStatusCases.map(status => {
                            return {
                                title: contentStatusName(status),
                                action: () => updateStatus(status)
                            }
                        })}/>
                    ) : null}
                </div>
            </div>
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
                                    Полное имя
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
                                {isLesson || (
                                    <th
                                        scope="col"
                                        className="pr-4 py-2 text-left text-footnote font-normal text-label-secondary"
                                    >
                                        Оценка
                                    </th>
                                )}
                                {isLesson || (
                                    <th
                                        scope="col"
                                        className="pr-4 py-2 text-left text-footnote font-normal text-label-secondary"
                                    >
                                        Submission
                                    </th>
                                )}
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                            {members.map((member) => (
                                <ContentMemberRow isLesson={isLesson}
                                                  isSelected={isSelected(member)}
                                                  selectMember={selectMember}
                                                  member={member}/>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
