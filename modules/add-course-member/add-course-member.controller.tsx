import {AddCourseMemberService} from "./add-course-member.service";
import {AddCourseMemberRequestDto} from "./add-course-member.dto";
import {useState} from "react";
import {useAppData} from "../app/app-data-provider";
import AddCourseMemberView from "./add-course-member.view";

interface AddCourseMemberControllerProps {
    courseId: number;
    open: boolean;
    close: () => void;
    memberAdded: () => void;
}

export default function AddCourseMemberController(props: AddCourseMemberControllerProps) {
    const {courseId, memberAdded, close, open} = props;
    const addCourseMemberService = new AddCourseMemberService();
    const {showError, validate, showSuccess} = useAppData();
    const [loading, setLoading] = useState(false);

    const addMember = async (body: AddCourseMemberRequestDto) => {
        setLoading(true);
        try {
            await validate(body);
            const message = await addCourseMemberService.addCourseMember(courseId, body);
            memberAdded();
            showSuccess(message);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    }


    return <AddCourseMemberView loading={loading}
                                open={open}
                                close={close}
                                addMember={addMember}/>

}