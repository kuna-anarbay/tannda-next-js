export const urlify = (text: string): string => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
        return '<a target="_blank" style="color: #054EA1;" href="' + url + '">' + url + '</a>';
    });
}
