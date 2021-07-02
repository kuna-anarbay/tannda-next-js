import {PresenceStatus, presenceStatusCases, presenceStatusName} from "../../models/presence.entity";
import {PresenceRequestDto} from "./presence.dto";
import Modal from "../util/modal";
import {Field, Form, Formik} from "formik";
import {ContentMember} from "../../models/content-member.entity";
import {strings} from "../../resources/strings";
import Button from "../util/button";

interface PresenceModalProps {
    open: boolean;
    close: () => void;
    members: ContentMember[];
    updatePresence: (body: PresenceRequestDto) => void;
}

export default function PresenceModal(props: PresenceModalProps) {
    const {open, close, updatePresence, members} = props;
    const initialValues = {
        relations: members.map(m => m.relationId),
        status: PresenceStatus.PRESENT,
        note: ""
    }

    return (
        <Modal open={open} close={close} title={"Update presence"}>
            <Formik initialValues={initialValues} onSubmit={updatePresence}>
                {({isSubmitting}) => (
                    <Form>
                        <div className={"space-y-4"}>
                            <div className={"text-footnote"}>
                                Update presence for: {members.map(member => (
                                    <span className={"rounded-1 bg-background-secondary py-0.5 px-1"}>
                                        {member.firstName} {member.lastName}
                                    </span>
                            ))}
                            </div>
                            <div>
                                <label>
                                    {strings.password}
                                </label>
                                <Field as={"select"}
                                       name={"status"}>
                                    {presenceStatusCases.map(status => (
                                        <option key={status} value={status}>
                                            {presenceStatusName(status)}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                            <div>
                                <label>
                                    {strings.password}
                                </label>
                                <Field as={"textarea"}
                                       placeholder={"Note"}
                                       name={"note"}
                                       rows={3}
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
