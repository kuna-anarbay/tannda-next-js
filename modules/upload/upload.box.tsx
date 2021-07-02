import {GetIcon, IconType} from "../../resources/icon";
import {Resource} from "../../models/resource.entity";
import ResourceCell from "../resources/resource.cell";

interface UploadBoxProps {
    file?: { resource: Resource, questionId: number, file: File };
    selectFile: (e) => void;
    removeFile: (questionId: number) => void;
}

export default function UploadBox(props: UploadBoxProps) {
    const {selectFile, file, removeFile} = props;

    return (
        <div>
            {file ? (
                <div>
                    <ResourceCell resource={file?.resource} remove={() => removeFile(file?.questionId)}/>
                </div>
            ) : (
                <label
                    htmlFor="file"
                    className={"rounded-md text-center border border-border border-dashed bg-background-secondary p-5"}
                >
                    <div>
                        <div className={"flex justify-center"}>
                            {GetIcon(IconType.Upload, "text-title2 text-center")}
                        </div>
                        <p className={"font-medium text-base"}>
                            Загрузить файл
                        </p>
                        <p className={"text-footnote text-label-secondary"}>
                            Щелкните или перетащите файл в эту область, чтобы загрузить
                        </p>
                    </div>
                    <input onChange={selectFile} id={"file"} type="file" className="hidden"/>
                </label>
            )}
        </div>
    )
}
