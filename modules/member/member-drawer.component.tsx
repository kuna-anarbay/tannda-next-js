import {getRoleName, getStatusName, Member, MemberStatus} from "../../models/member";
import {CSSTransition} from "react-transition-group";
import {getIcon, IconType} from "../util/icon";
import moment from "moment";
import {useEffect, useState} from "react";
import Avatar from "../util/avatar";
import MemberService from "../../services/member.service";
import {useAppData} from "../app/app-data-provider";

interface MemberDrawerComponentProps {
    courseId: number;
    member?: Member;
    open: boolean;
    close: () => void;
}

export default function MemberDrawerComponent(props: MemberDrawerComponentProps) {
    const {member, open, close, courseId} = props;
    const [selectedTab, setSelectedTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const {showError, showSuccess} = useAppData();
    const memberService = new MemberService();


    return (
        <div>
            <CSSTransition
                in={open}
                timeout={100}
                classNames="drawer-bg"
                unmountOnExit
                appear
            >
                <div onClick={() => close()} className={"bg-label bg-opacity-20 fixed inset-0 z-40"}/>
            </CSSTransition>
            <CSSTransition
                in={open}
                timeout={400}
                classNames="drawer-content"
                unmountOnExit
                appear
            >
                <div
                    className={"fixed right-0 top-0 bottom-0 right-0 p-4 w-full md:w-1/3 z-40"}>
                    <div className={"bg-background h-full border border-border rounded-1.5 space-y-4"}>
                        <div className={"relative flex items-center justify-center px-4 border-b border-border"}>
                            <div onClick={close}
                                 className={"cursor-pointer absolute right-4 flex items-center justify-center p-1 rounded-full bg-background-secondary"}>
                                {getIcon(IconType.XMark, "text-primary")}
                            </div>
                            <p className={"py-3 text-footnote text-center"}>
                                Детали участника
                            </p>
                        </div>
                        <div className={"space-y-3 px-6"}>
                            <div className={"space-y-2"}>
                                <div className={"flex justify-center"}>
                                    <Avatar src={member.avatar} className={"h-16 w-16"}/>
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
                            <div>
                                <div className={"space-y-3"}>
                                    <div>
                                        <p className={"text-footnote small-caps text-label-light"}>
                                            роль
                                        </p>
                                        <p className={"text-subheadline"}>
                                            {getRoleName(member.role)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className={"text-footnote small-caps text-label-light"}>
                                            статус
                                        </p>
                                        <p className={"text-subheadline small-caps"}>
                                            {getStatusName(member.status).toLowerCase()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className={"text-footnote small-caps text-label-light"}>
                                            создано в
                                        </p>
                                        <p className={"text-subheadline"}>
                                            {moment(member.createdAt).format('lll')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={"p-4 flex space-x-2 absolute left-4 right-4 bottom-4 border-t border-border rounded-b-1.5 bg-muted"}>
                            {[MemberStatus.ACTIVE].includes(member.status) ? (
                                <button className={"btn btn-warning w-full"}>
                                    Архивировать
                                </button>
                            ) : null}
                            {[MemberStatus.ARCHIVED, MemberStatus.ACTIVE].includes(member.status) ? (
                                <button className={"btn btn-danger w-full"}>
                                    Удалить
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}

