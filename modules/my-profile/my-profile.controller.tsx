import MyProfileService from "./my-profile.service";
import {useEffect, useState} from "react";
import {useAppData} from "../app/app-data-provider";
import MyProfileView from "./my-profile.view";
import Spinner from "../util/spinner.component";
import {UpdateProfileRequestDto} from "./my-profile.dto";

interface MyProfileControllerProps {

}

export default function MyProfileController(props: MyProfileControllerProps) {
    const myProfileService = new MyProfileService();
    const {currentUser, showError, validate} = useAppData();
    const [user, setUser] = useState(currentUser);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [{file, src}, setFile] = useState({file: null, src: null});

    useEffect(() => {
        getMyProfile();
    }, [])

    const getMyProfile = async () => {
        setLoading(!user);
        try {
            const data = await myProfileService.getMyProfile();
            setLoading(false);
            setUser(data);
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    }

    const handleFile = (e: any | null) => {
        if (!e) {
            setFile({
                src: null,
                file: null
            });
        } else {
            setFile({
                src: URL.createObjectURL(e.target.files[0]),
                file: e.target.files[0]
            });
        }
    }


    const updateProfile = async (body: UpdateProfileRequestDto) => {
        setSubmitting(true);
        try {
            await validate(body);
            await myProfileService.updateProfile(body);
            await uploadAvatar();
            setSubmitting(false);
        } catch (err) {
            setSubmitting(false);
            showError(err.message);
        }
    }

    const uploadAvatar = async () => {
        if (!file) return;
        await myProfileService.updateAvatar(file);
    }


    if (loading) return <Spinner/>
    if (!user) return null;

    return <MyProfileView user={user}
                          src={src}
                          submitting={submitting}
                          handleFile={handleFile}
                          updateProfile={updateProfile}/>
}
