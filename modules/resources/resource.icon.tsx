import {ResourceType} from "./resource.enum";
import r from "../util/r";

export const resourceIcon = (name: string) => {
    const type = name.split('.').pop().toLowerCase() as ResourceType;
    switch (type) {
        case ResourceType.DOC:
        case ResourceType.DOCX:
            return r.image.file.doc;
        case ResourceType.JPEG:
        case ResourceType.JPG:
        case ResourceType.PNG:
            return r.image.file.image;
        case ResourceType.PDF:
            return r.image.file.pdf;
        case ResourceType.PPT:
        case ResourceType.PPTX:
            return r.image.file.presentation;
        case ResourceType.XLS:
        case ResourceType.XLSX:
            return r.image.file.sheets;
    }
}
