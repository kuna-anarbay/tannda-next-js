export class Resource {
    id: number;
    originalName: string;
    url?: string;
    size: number;

    constructor(file: File) {
        this.originalName = file.name;
        this.size = file.size;
        this.id = file.size;
    }
}


export const bytesToSize = (size: number) => {
    if (!size) return null;
    if (size === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(size) / Math.log(k));

    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
