import Course from "../../models/course.entity";
import CourseMembersService from "./course-members.service";
import {useEffect, useState} from "react";
import {CacheItem, useAppData} from "../app/app-data-provider";
import {MemberEntity, MemberStatus} from "../../models/member.entity";
import CourseMembersView from "./course-members.view";
import AddCourseMemberController from "../add-course-member/add-course-member.controller";

interface CourseMemberControllerProps {
    course: Course;
}

export default function CourseMembersController(props: CourseMemberControllerProps) {
    const {course} = props;
    const courseMemberService = new CourseMembersService();
    const {getItem, setItem, showError} = useAppData();
    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState(getItem(CacheItem.MEMBERS) ?? Array<MemberEntity>());
    const [selectedMembers, setSelectedMembers] = useState(Array<MemberEntity>());
    const [newMemberModal, setNewMemberModal] = useState(false);

    useEffect(() => {
        getMembers();
    }, []);

    const getMembers = async () => {
        setLoading(members.length === 0);
        try {
            const data = await courseMemberService.getMembers(course.id);
            setItem(CacheItem.MEMBERS, data);
            setLoading(false);
            setMembers(data);
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    }

    const isAllSelected = () => {
        return selectedMembers.length === members.length;
    }

    const isSelected = (member: MemberEntity) => {
        return !!selectedMembers.find(m => m.id === member.id);
    }

    const selectMember = (member: MemberEntity) => {
        if (isSelected(member)) {
            setSelectedMembers(selectedMembers.filter(m => m.id !== member.id))
        } else {
            setSelectedMembers([...selectedMembers, member]);
        }
    }

    const activateMember = async (member: MemberEntity) => {
        const index = members.findIndex(m => m.id === member.id);
        if (!index) return;
        members[index].status = MemberStatus.ACTIVE;
        setMembers(members);
        try {
            await courseMemberService.updateMemberStatus(course.id, member.id, {status: MemberStatus.ACTIVE});
        } catch (err) {
            members[index].status = member.status;
            setMembers(members);
            showError(err.message);
        }
    }

    const archiveMember = async (member: MemberEntity) => {
        const index = members.findIndex(m => m.id === member.id);
        if (!index) return;
        members[index].status = MemberStatus.ARCHIVED;
        setMembers(members);
        try {
            await courseMemberService.updateMemberStatus(course.id, member.id, {status: MemberStatus.ARCHIVED});
        } catch (err) {
            members[index].status = member.status;
            setMembers(members);
            showError(err.message);
        }
    }

    const deleteMember = async (member: MemberEntity) => {
        setMembers(members.filter(m => m.id !== member.id));
        try {
            await courseMemberService.deleteMember(course.id, member.id);
        } catch (err) {
            setMembers([...members, member]);
            showError(err.message);
        }
    }

    const addNewMember = () => {
        setNewMemberModal(!newMemberModal);
    }

    const selectAll = () => {
        if (isAllSelected()) {
            setSelectedMembers([]);
        } else {
            setSelectedMembers(members);
        }
    }

    const memberAdded = () => {
        close();
        getMembers();
    }

    return (
        <div>
            <AddCourseMemberController courseId={course.id}
                                       open={newMemberModal}
                                       close={addNewMember}
                                       memberAdded={memberAdded}/>
            <CourseMembersView members={members}
                               refresh={getMembers}
                               loading={loading}
                               isAllSelected={isAllSelected()}
                               isSelected={isSelected}
                               selectAll={selectAll}
                               selectMember={selectMember}
                               activateMember={activateMember}
                               archiveMember={archiveMember}
                               deleteMember={deleteMember}
                               addNewMember={addNewMember}/>
        </div>
    )
}
