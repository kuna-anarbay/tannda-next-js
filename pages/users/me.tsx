import useInitialProps from "../../hooks/use.initial-props";
import {URLPath} from "../../services/http/URLPath";
import Spinner from "../../modules/util/spinner.component";
import UserComponent from "../../modules/user/user.component";
import {Profile} from "../../services/dto/profile.dto";

export default function UserPage() {
    const {data: profile, loading} = useInitialProps<Profile>(URLPath.profile.me);

    if (loading) {
        return <Spinner/>;
    }

    if (!profile) {
        return null;
    }

    return <UserComponent profile={profile}/>
}