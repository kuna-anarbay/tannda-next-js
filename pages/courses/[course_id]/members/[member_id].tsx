import MemberComponent from "../../../../modules/member/member.component";

export interface MemberPageProps {
    courseId: number;
    memberId: number;
}

export default function MemberPage(props: MemberPageProps) {
    const {courseId, memberId} = props;
    return <MemberComponent courseId={courseId} userId={memberId}/>
}

MemberPage.getInitialProps = ({query: {course_id, member_id}}) => {
    return {
        courseId: course_id,
        memberId: member_id
    }
}
