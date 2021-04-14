import LocalDatabase from "../../localDatabase";

export const HTTPHeader = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${LocalDatabase.instance.getToken()?.value}`
}