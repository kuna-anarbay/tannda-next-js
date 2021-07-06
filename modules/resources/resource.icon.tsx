import {ResourceType} from "./resource.enum";
import {images} from "../../resources/images";


export const resourceIcon = (name: string) => {
    const type = name.split('.').pop().toLowerCase() as ResourceType;
    switch (type) {
        case ResourceType.DOC:
        case ResourceType.DOCX:
            return images.file.doc;
        case ResourceType.JPEG:
        case ResourceType.JPG:
        case ResourceType.PNG:
            return images.file.image;
        case ResourceType.PDF:
            return images.file.pdf;
        case ResourceType.PPT:
        case ResourceType.PPTX:
            return images.file.presentation;
        case ResourceType.XLS:
        case ResourceType.XLSX:
            return images.file.sheets;
    }
}
