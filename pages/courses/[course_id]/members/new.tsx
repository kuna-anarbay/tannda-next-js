import AddMemberComponent from "../../../../modules/courses/add-member.component";

export interface AddMemberPageProps {
    id: number;
}

export default function AddMemberPage(props: AddMemberPageProps) {
    return <AddMemberComponent id={props.id}/>
}

AddMemberPage.getInitialProps = ({query: {id}}) => {
    return {
        id: id
    }
}
