import {getRoleName, getStatusColor, getStatusName, Member} from "../../models/member";
import MemberDrawerComponent from "./member-drawer.component";
import {useState} from "react";
import Avatar from "../util/avatar";

interface MemberRowComponentProps {
    member: Member;
    courseId: number;
}

export default function MemberRowComponent(props: MemberRowComponentProps) {
    const {member, courseId} = props;
    const [open, setOpen] = useState(false);


    return (
        <tr onClick={() => setOpen(!open)} key={member.id} className={"hover:bg-light cursor-pointer border-b border-border"}>
            <td className="pr-4 py-1 whitespace-nowrap">
                <input type={"checkbox"} />
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
            <MemberDrawerComponent courseId={courseId} close={() => setOpen(!open)} open={open}
                                   member={member}/>
        </tr>
    )
}
