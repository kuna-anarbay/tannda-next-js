import User from "../../models/user.entity";
import {UpdateProfileRequestDto} from "./my-profile.dto";
import {Field, Form, Formik} from "formik";
import Avatar from "../util/avatar";
import {strings} from "../../resources/strings";
import Button from "../util/button";

interface MyProfileViewProps {
    user: User;
    src: string;
    submitting: boolean;
    handleFile: (e: any | null) => void;
    updateProfile: (values: UpdateProfileRequestDto) => void;
}

export default function MyProfileView(props: MyProfileViewProps) {
    const {user, handleFile, updateProfile, src, submitting} = props;
    const {avatar, firstName, lastName} = user;

    const profileDefaultValues = {
        firstName: firstName,
        lastName: lastName
    };

    return (
        <div className={"px-4 mx-auto md:w-4/12 py-16"}>
            <Formik initialValues={profileDefaultValues} onSubmit={updateProfile}>
                <Form className={"space-y-4"}>
                    <div className={"flex space-x-8 items-center"}>
                        <Avatar src={src ? src : avatar} className={"h-28 w-28"}/>
                        <div className={"flex space-x-4 items-center"}>
                            <label
                                htmlFor="file"
                                className="btn btn-outline btn-sm cursor-pointer"
                            >
                                <span>{strings.chooseImage}</span>
                                <Field onChange={handleFile} id={"file"} type="file" name="file" className="hidden"/>
                            </label>
                            {src ? (
                                <Button className={"btn btn-sm btn-danger btn-outline"} onClick={() => handleFile(null)}
                                        title={strings.delete}/>
                            ) : null}
                        </div>
                    </div>
                    <div>
                        <label className={"block text-caption1 text-label-light"}>
                            {strings.firstName}
                        </label>
                        <Field name={"firstName"}
                               type={"text"}
                               placeholder={strings.firstName}
                               className="input-text"/>
                    </div>
                    <div>
                        <label className={"block text-caption1 text-label-light"}>
                            {strings.lastName}
                        </label>
                        <Field name={"lastName"}
                               type={"text"}
                               placeholder={strings.lastName}
                               className="input-text"/>
                    </div>
                    <Button loading={submitting} title={strings.save} type={"submit"}
                            className={"btn btn-sm btn-primary"}/>
                </Form>
            </Formik>
        </div>
    )
}
