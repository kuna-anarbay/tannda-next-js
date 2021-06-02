export interface MemberPageProps {
    courseId: number;
    memberId: number;
}

export default function MemberPage(props: MemberPageProps) {
    return <div></div>
}

MemberPage.getInitialProps = ({query: {course_id, member_id}}) => {
    return {
        courseId: course_id,
        memberId: member_id
    }
}
