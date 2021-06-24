import {Content} from "../../models/content";
import Section from "../../models/section";
import {MemberRole} from "../../models/member";
import {Field, Form, Formik} from "formik";
import ResourceCell from "../resources/resource.cell";
import {Resource} from "../../models/resource";
import {useState} from "react";
import ContentService from "../../services/content.service";
import {useAppData} from "../app/app-data-provider";
import {useRouter} from "next/router";
import ConfirmationModal from "../util/confirmation.modal";
import useInitialProps from "../../hooks/use.initial-props";
import {URLPath} from "../../services/http/URLPath";
import Button from "../util/button";
import {strings} from "../util/strings";

interface ContentInfoComponentProps {
    content: Content;
    courseId: number;
    role: MemberRole;
    contentUpdated: (content: Content) => void;
}

export default function ContentInfoComponent(props: ContentInfoComponentProps) {
    const {content, courseId, role, contentUpdated} = props;
    const contentService = new ContentService();
    const {data: sections} = useInitialProps<Section[]>(URLPath.section.base(courseId), "sections");
    const {showError, showSuccess} = useAppData();
    const {push} = useRouter();
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [resources, setResources] = useState(content.resources ?? []);
    const [files, setFiles] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const result = await contentService.updateContent(courseId, content.id, {
                title: values.title,
                description: values.description,
                sectionId: values.sectionId
            });
            const newResources = await uploadFiles(content.id);
            setResources([...resources, ...newResources]);
            setFiles([]);
            contentUpdated(content);
            setLoading(false);
            showSuccess("Урок обновлен");
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    }

    const uploadFiles = async (contentId: number) => {
        return contentService.uploadFiles(courseId, contentId, files.map(f => f.file));
    }


    const handleDelete = async () => {
        setDeleting(true);
        try {
            const message = await contentService.deleteContent(courseId, content.id);
            setDeleting(false);
            showSuccess(message);
            await push(`/courses/${courseId}`);
        } catch (err) {
            setDeleting(false);
            showError(err.message);
        }
    }


    const deleteResource = async (resource: Resource, index: number) => {
        setResources(resources.filter(r => r.id !== resource.id))
        try {
            const message = await contentService.deleteFiles(courseId, content.id, [resource.id]);
            showSuccess(message);
        } catch (err) {
            resources.splice(index, 0, resource);
            setResources(resources);
            showError(err.message);
        }
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
        <div className="py-6 space-y-12">
            <div className={"space-y-2"}>
                <h3 className={"text-title3 font-semibold"}>
                    Детали урока
                </h3>
                <Formik initialValues={content} onSubmit={(values) => handleSubmit(values)}>
                    <Form className={"grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12"}>
                        <div className={"space-y-2.5"}>
                            <div>
                                <label>
                                    {strings.title}
                                </label>
                                <Field name={"title"}
                                       placeholder={strings.title}
                                       type={"text"}/>
                            </div>
                            <div>
                                <label>
                                    {strings.description}
                                </label>
                                <Field as={"textarea"}
                                       name={"description"}
                                       rows={6}
                                       placeholder={strings.description}
                                       className="textarea"/>
                            </div>
                            <div>
                                <label>
                                    {"Sections"}
                                </label>
                                <Field as={"select"}
                                       name={"sectionId"}
                                       placeholder={strings.description}
                                >
                                    {sections ? sections.map(section => (
                                        <option key={section.id} value={section.id}>
                                            {section.title}
                                        </option>
                                    )) : null}
                                </Field>
                            </div>
                        </div>
                        <div>
                            <div className={"flex justify-between items-center"}>
                                <label className={"text-footnote"}>
                                    {strings.resources}
                                </label>
                                <label
                                    htmlFor="file"
                                    className="btn btn-outline btn-sm cursor-pointer "
                                >
                                    <span>Добавить</span>
                                    <Field onChange={handleFile} id={"file"} type="file" name="file"
                                           className="hidden"/>
                                </label>
                            </div>
                            <div className={"space-y-2 mt-1"}>
                                {resources.map((resource, index) => (
                                    <ResourceCell resource={resource}
                                                  remove={() => deleteResource(resource, index)}/>
                                ))}
                                {files.map((file, index) => (
                                    <ResourceCell resource={new Resource(file)}
                                                  remove={() => removeFile(index)}/>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Button title={"Save"} type={"submit"} loading={loading} className={"btn btn-primary"}/>
                        </div>
                    </Form>
                </Formik>
            </div>
            <div className={"space-y-2"}>
                <h3 className={"text-title3 font-semibold"}>
                    Зона опасности
                </h3>
                <div className={"border rounded-md list-bordered border-red"}>
                    <div className={"flex py-3 px-4 items-center justify-between"}>
                        <div>
                            <p className={"font-medium"}>
                                Удалить этот урок
                            </p>
                            <p className={"text-footnote text-label-secondary"}>
                                После того, как вы удалите контент, пути назад уже не будет. Пожалуйста, будьте уверены.
                            </p>
                        </div>
                        <div>
                            <button onClick={() => setDeleteModal(!deleteModal)}
                                    className={"btn btn-danger btn-outline"}>
                                Удалить урок
                            </button>
                            <ConfirmationModal loading={deleting}
                                               state={"danger"}
                                               open={deleteModal}
                                               title={"Удалить этот урок?"}
                                               body={"После того, как вы удалите контент, пути назад уже не будет. Пожалуйста, будьте уверены."}
                                               handleOk={handleDelete}
                                               handleCancel={() => setDeleteModal(!deleteModal)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
