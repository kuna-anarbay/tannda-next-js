import {Content} from "../../models/content";
import Section from "../../models/section";
import {MemberRole} from "../../models/member";
import {Field, Form, Formik} from "formik";
import r from "../util/r";
import ResourceCell from "../resources/resource.cell";
import {Resource} from "../../models/resource";
import {useState} from "react";

interface ContentInfoComponentProps {
    content: Content;
    section: Section;
    courseId: number;
    role: MemberRole;
}

export default function ContentInfoComponent(props: ContentInfoComponentProps) {
    const {content, section, courseId, role} = props;
    const [files, setFiles] = useState([]);

    const handleSubmit = (values) => {

    }

    const handleFile = (e) => {
        setFiles([
            ...files,
            {
                url: URL.createObjectURL(e.target.files[0]),
                file: e.target.files[0],
                name: e.target.files[0].name
            }
        ]);
    }


    const removeFile = (index: number) => {
        setFiles(files.filter((f, i) => i !== index));
    }

    return (
        <div className="py-6 space-y-4">
            <Formik initialValues={content} onSubmit={(values) => handleSubmit(values)}>
                <Form className={"form space-y-6"}>
                    <div className={"space-y-2.5"}>
                        <div>
                            <label>
                                {r.string.title}
                            </label>
                            <Field name={"title"}
                                   placeholder={r.string.title}
                                   type={"text"}/>
                        </div>
                        <div>
                            <label>
                                {r.string.description}
                            </label>
                            <Field as={"textarea"}
                                   name={"description"}
                                   rows={6}
                                   placeholder={r.string.description}
                                   className="textarea"/>
                        </div>
                    </div>
                    <div>
                        <div className={"flex justify-between items-center"}>
                            <label className={"text-footnote"}>
                                {r.string.resources}
                            </label>
                            <label
                                htmlFor="file"
                                className="btn btn-outline btn-sm cursor-pointer "
                            >
                                <span>Добавить</span>
                                <Field onChange={handleFile} id={"file"} type="file" name="file"
                                       className="sr-only"/>
                            </label>
                        </div>
                        <div className={"space-y-2 mt-1"}>
                            {content.resources.map((resource, index) => (
                                <ResourceCell resource={resource}
                                              remove={() => removeFile(index)}/>
                            ))}
                            {files.map((file, index) => (
                                <ResourceCell resource={new Resource(file)}
                                              remove={() => removeFile(index)}/>
                            ))}
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
