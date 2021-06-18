import moment from "moment";
moment.locale("ru");

export const getDate = (date: Date, format: string) => {
    if (!date) return null;
    return moment(date).utcOffset(9).format(format);
}
