import {useToasts} from "react-toast-notifications";
import {useEffect, useState} from "react";
import MemberService from "../../services/member.service";
import moment from "moment";

interface MemberComponentProps {
    courseId: number;
    userId: number;
}


export default function MemberComponent(props: MemberComponentProps) {
    const {userId, courseId} = props;
    const memberService = new MemberService();
    const {addToast} = useToasts();
    const [member, setMember] = useState(null);

    useEffect(() => {
        getMember();
    }, []);

    const getMember = async () => {
        try {
            const member = await memberService.getMember(courseId, userId);
            console.log(member);
            setMember(member);
        } catch (err) {
            addToast(err.message, {autoDismiss: true, appearance: "error"});
        }
    }


    return (
        <div className={"px-container py-6"}>
            {member ? (
                <div className={"space-y-3 md:w-1/2"}>
                    <div className={"space-y-2"}>
                        <div className={"flex justify-center"}>
                            <img className={"rounded-full h-16 w-16"} src={member.avatar}/>
                        </div>
                        <div className={"text-center"}>
                            <h4 className={"text-base"}>
                                {member.firstName} {member.lastName}
                            </h4>
                            <p className={"text-footnote text-label-light"}>
                                {member.phone}
                            </p>
                        </div>
                    </div>
                    <div className={"space-y-2"}>
                        <div>
                            <p className={"text-footnote small-caps text-label-light"}>
                                role
                            </p>
                            <p className={"text-base"}>
                                {member.role}
                            </p>
                        </div>
                        <div>
                            <p className={"text-footnote small-caps text-label-light"}>
                                status
                            </p>
                            <p className={"text-base"}>
                                {member.status}
                            </p>
                        </div>
                        <div>
                            <p className={"text-footnote small-caps text-label-light"}>
                                created at
                            </p>
                            <p className={"text-base"}>
                                {moment(member.createdAt).format('lll')}
                            </p>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
