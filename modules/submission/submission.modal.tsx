import Modal from "../util/modal";
import {Field, Form, Formik} from "formik";
import {ContentMember} from "../../models/content-member";
import {strings} from "../util/strings";
import Button from "../util/button";
import {SubmissionRequestDto} from "./submission.dto";
import DatePicker from "react-datepicker";
import {getDate} from "../util/date";
import "react-datepicker/dist/react-datepicker.css";

interface SubmissionModalProps {
    open: boolean;
    close: () => void;
    members: ContentMember[];
    updateSubmission: (body: SubmissionRequestDto) => void;
}

export default function SubmissionModal(props: SubmissionModalProps) {
    const {open, close, updateSubmission, members} = props;
    const initialValues = {
        relations: members.map(m => m.relationId),
        availableFrom: new Date(),
        availableTo: new Date(),
        duration: 60
    }

    return (
        <Modal open={open} close={close} title={"Update submission"}>
            <Formik initialValues={initialValues} onSubmit={updateSubmission}>
                {({isSubmitting, values, setFieldValue}) => (
                    <Form>
                        <div className={"space-y-4"}>
                            <div className={"text-footnote"}>
                                Update submission for: {members.map(member => (
                                <span className={"rounded-1 bg-background-secondary py-0.5 px-1"}>
                                        {member.firstName} {member.lastName}
                                    </span>
                            ))}
                            </div>
                            <div className={"grid grid-cols-2 gap-2"}>
                                <div>
                                    <label>
                                        {strings.password}
                                    </label>
                                    <DatePicker
                                        showTimeSelect
                                        selected={values.availableFrom}
                                        onChange={val => setFieldValue("availableFrom", val)}
                                        dateFormat={"MMMM d, yyyy HH:mm"}
                                        locale={"ru-RU"}
                                    />
                                </div>
                                <div>
                                    <label>
                                        {strings.password}
                                    </label>
                                    <DatePicker
                                        showTimeSelect
                                        selected={values.availableTo}
                                        onChange={val => setFieldValue("availableTo", val)}
                                        dateFormat={"MMMM d, yyyy HH:mm"}
                                        locale={"ru-RU"}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>
                                    Duration (in mins)
                                </label>
                                <Field type={"number"}
                                       placeholder={"Duration"}
                                       name={"duration"}
                                />
                            </div>
                            <Button className={"btn btn-primary"}
                                    title={strings.login}
                                    loading={isSubmitting}
                                    type={"submit"}/>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}
