import useInitialProps from "../../hooks/use.initial-props";
import {URLPath} from "../../services/http/URLPath";
import CoursePage from "../courses/[course_id]";
import Spinner from "../../modules/util/spinner.component";
import UserComponent from "../../modules/user/user.component";
import {Profile} from "../../services/dto/profile.dto";

interface UserPageProps {
    userId: number;
}

export default function UserPage() {
    const {data: profile, loading} = useInitialProps<Profile>(URLPath.profile.me);

    if(loading) {
        return <Spinner/>;
    }

    if(!profile) {
        return null;
    }

    return <UserComponent profile={profile} />
}

UserPage.getInitialProps = ({query: {user_id}}) => {
    return {
        userId: user_id
    }
}
