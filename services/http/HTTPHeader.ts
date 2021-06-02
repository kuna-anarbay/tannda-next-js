import LocalDatabase from "../localDatabase";

export const HTTPHeader = () => {
    const headers = {
        "Content-Type": "application/json",
    };
    const data = LocalDatabase.instance.getUser();
    if (data) {
        headers["Authorization"] = `Bearer ${data.accessToken}`;
        headers["Refresh-Token"] = `${data.refreshToken}`;
    }

    return headers;
}
