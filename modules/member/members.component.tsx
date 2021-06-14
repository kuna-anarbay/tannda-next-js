import {useEffect, useState} from "react";
import {Member, MemberRole} from "../../models/member";
import {useAppData} from "../app/app-data-provider";
import MemberRowComponent from "./member-row.component";
import AddMemberComponent from "./add-member.component";
import MemberService from "../../services/member.service";
import Spinner from "../util/spinner.component";
import {getIcon, IconType} from "../util/icon";

interface MembersComponentProps {
    id: number;
    role: MemberRole;
}

export default function MembersComponent(props: MembersComponentProps) {
    const {id} = props;
    const courseService = new MemberService();
    const {showError} = useAppData();
    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState(Array<Member>());
    const [newMember, setNewMember] = useState(false);

    useEffect(() => {
        getMembers();
    }, [])

    const getMembers = async () => {
        setLoading(true);
        try {
            const members = await courseService.getMembers(props.id);
            setLoading(false);
            setMembers(members);
        } catch (e) {
            setLoading(false);
            showError(e.message);
        }
    }

    return (
        <div className="py-6 space-y-3">
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
                <div>
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
                            <button onClick={() => setNewMember(!newMember)} type={"button"} className={"btn btn-sm btn-outline"}>
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
                                            <input type={"checkbox"} />
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
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                    {members.map((member) => (
                                        <MemberRowComponent member={member} courseId={id}/>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddMemberComponent id={id} open={newMember} close={() => setNewMember(!newMember)}/>
        </div>
    )
}
