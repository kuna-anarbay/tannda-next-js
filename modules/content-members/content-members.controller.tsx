import ContentMembersService from "./content-members.service";
import {CacheItem, useAppData} from "../app/app-data-provider";
import {useEffect, useState} from "react";
import {ContentMember} from "../../models/content-member.entity";
import {Member} from "../../models/member.entity";
import ContentMembersView from "./content-members.view";
import {ContentStatus} from "../../models/content.entity";
import PresenceModal from "../presence/presence.modal";
import {PresenceRequestDto} from "../presence/presence.dto";
import SubmissionModal from "../submission/submission.modal";
import {SubmissionRequestDto} from "../submission/submission.dto";

interface ContentMembersControllerProps {
    courseId: number;
    contentId: number;
    isLesson: boolean;
    canEdit: boolean;
}

export default function ContentMembersController(props: ContentMembersControllerProps) {
    const {courseId, contentId, canEdit, isLesson} = props;
    const contentMembersService = new ContentMembersService();
    const {showError, getItem, validate} = useAppData();
    const [contentMembers, setContentMembers] = useState(Array<ContentMember>());
    const [members, setMembers] = useState(getItem(CacheItem.MEMBERS) ?? Array<Member>());
    const [selectedMembers, setSelectedMembers] = useState(Array<ContentMember>());
    const [loading, setLoading] = useState(false);
    const [presenceModal, setPresenceModal] = useState(false);
    const [submissionModal, setSubmissionModal] = useState(false);

    useEffect(() => {
        getContentMembers();
        getCourseMembers();
    }, [])

    const getContentMembers = async () => {
        setLoading(true);
        try {
            const data = await contentMembersService.getContentMembers(courseId, contentId);
            setLoading(false);
            setContentMembers(data);
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    }

    const getCourseMembers = async () => {
        try {
            const data = await contentMembersService.getCourseMembers(courseId);
            setMembers(data);
        } catch (err) {
            showError(err.message);
        }
    }

    const getMembers = () => {
        const items = members.filter(m => !contentMembers.find(c => c.id === m.id));
        return [...contentMembers, ...items.map(i => new ContentMember(i))];
    }

    const selectAll = () => {
        setSelectedMembers(isAllSelected() ? [] : contentMembers);
    }

    const selectMember = (member: ContentMember) => {
        if (isSelected(member)) {
            setSelectedMembers(selectedMembers.filter(m => m.id !== member.id));
        } else {
            setSelectedMembers([...selectedMembers, member]);
        }
    }

    const isAllSelected = () => {
        return selectedMembers.length === contentMembers.length;
    }

    const isSelected = (member: ContentMember) => {
        return !!selectedMembers.find(m => m.id === member.id);
    }

    const updateStatus = async (status: ContentStatus) => {
        const ids = selectedMembers.map(m => m.id);
        if (ids.length === 0) return;
        const oldData = contentMembers;
        setContentMembers([
            ...contentMembers.filter(m => !ids.includes(m.id)),
            ...contentMembers.filter(m => ids.includes(m.id)).map(m => {
                return {
                    ...m,
                    contentStatus: status
                }
            })
        ]);
        try {
            await contentMembersService.updateStatus(courseId, contentId, {status, ids});
        } catch (e) {
            setContentMembers(oldData);
            showError(e.message);
        }
    }

    const updatePresenceModal = () => {
        setPresenceModal(!presenceModal);
    }

    const updateSubmissionModal = () => {
        setSubmissionModal(!submissionModal);
    }

    const updatePresence = async (body: PresenceRequestDto) => {
        const ids = selectedMembers.map(m => m.id);
        if (ids.length === 0) return;
        const oldData = contentMembers;
        try {
            await validate(body);
            setContentMembers([
                ...contentMembers.filter(m => !ids.includes(m.id)),
                ...contentMembers.filter(m => ids.includes(m.id)).map(m => {
                    return {
                        ...m,
                        presence: {
                            status: body.status,
                            note: body.note,
                            updatedAt: new Date()
                        }
                    }
                })
            ]);
            updatePresenceModal();
            await contentMembersService.updatePresence(courseId, body);
        } catch (err) {
            setContentMembers(oldData);
            showError(err.message);
        }
    }

    const updateSubmission = async (body: SubmissionRequestDto) => {
        const ids = selectedMembers.map(m => m.id);
        if (ids.length === 0) return;
        const oldData = contentMembers;
        try {
            await validate(body);
            setContentMembers([
                ...contentMembers.filter(m => !ids.includes(m.id)),
                ...contentMembers.filter(m => ids.includes(m.id)).map(m => {
                    return {
                        ...m,
                        submission: {
                            availableFrom: body.availableFrom,
                            availableTo: body.availableTo,
                            duration: body.duration,
                            submittedAt: null
                        }
                    }
                })
            ]);
            updateSubmissionModal();
            await contentMembersService.updateSubmission(courseId, body);
        } catch (err) {
            setContentMembers(oldData);
            showError(err.message);
        }
    }


    return (
        <div>
            <ContentMembersView isLesson={isLesson}
                                updateSubmission={updateSubmissionModal}
                                updatePresence={updatePresenceModal}
                                updateStatus={updateStatus}
                                selectMember={selectMember}
                                isSelected={isSelected}
                                loading={loading}
                                members={getMembers()}
                                canEdit={canEdit}
                                reload={getContentMembers}
                                selectAll={selectAll}
                                isAllSelected={isAllSelected()}
            />
            <PresenceModal open={presenceModal}
                           close={updatePresenceModal}
                           members={selectedMembers}
                           updatePresence={updatePresence}
            />
            <SubmissionModal open={submissionModal}
                             close={updateSubmissionModal}
                             members={selectedMembers}
                             updateSubmission={updateSubmission}
            />
        </div>
    )
}
