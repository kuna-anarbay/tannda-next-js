import {Profile} from "../../services/dto/profile.dto";
import Avatar from "../util/avatar";
import {Field, Form, Formik} from "formik";
import {useState} from "react";
import Button from "../util/button";
import ProfileService from "../../services/profile.service";
import {useAppData} from "../app/app-data-provider";
import r from "../util/r";

interface UserComponentProps {
    profile: Profile;
}

export default function UserComponent(props: UserComponentProps) {
    const {profile} = props;
    const [preview, setPreview] = useState(null);
    const profileService = new ProfileService();
    const {showError, showSuccess} = useAppData();
    const [loading, setLoading] = useState(false);


    const handleFile = (e) => {
        setPreview({
            url: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        });
    }


    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await profileService.updateProfile(values.firstName, values.lastName);
            if (preview && preview.file) {
                await profileService.updateAvatar(preview.file);
            }
            setLoading(false);
            showSuccess(response);
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    }

    return (
        <div className={"px-4 mx-auto md:w-4/12 py-16"}>
            <Formik initialValues={profile} onSubmit={handleSubmit}>
                <Form className={"space-y-4"}>
                    <div className={"flex space-x-8 items-center"}>
                        <Avatar src={preview ? preview.url : profile.avatar} className={"h-28 w-28"}/>
                        <div className={"flex space-x-4 items-center"}>
                            <label
                                htmlFor="file"
                                className="btn btn-outline btn-sm cursor-pointer"
                            >
                                <span>{r.string.chooseImage}</span>
                                <Field onChange={handleFile} id={"file"} type="file" name="file" className="sr-only"/>
                            </label>
                            {preview ? (
                                <Button className={"btn btn-sm btn-danger btn-outline"} onClick={() => setPreview(null)}
                                        title={r.string.delete}/>
                            ) : null}
                        </div>
                    </div>
                    <div>
                        <label className={"block text-caption1 text-label-light"}>
                            {r.string.firstName}
                        </label>
                        <Field name={"firstName"}
                               type={"text"}
                               placeholder={r.string.firstName}
                               className="input-text"/>
                    </div>
                    <div>
                        <label className={"block text-caption1 text-label-light"}>
                            {r.string.lastName}
                        </label>
                        <Field name={"lastName"}
                               type={"text"}
                               placeholder={r.string.lastName}
                               className="input-text"/>
                    </div>
                    <Button loading={loading} title={r.string.save} type={"submit"}
                            className={"btn btn-sm btn-primary"}/>
                </Form>
            </Formik>
        </div>
    )
}
