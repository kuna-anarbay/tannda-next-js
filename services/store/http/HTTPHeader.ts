import LocalDatabase from "../../localDatabase";

export const HTTPHeader = () => {
    const headers = {
        "Content-Type": "application/json",
    };

    const accessToken = LocalDatabase.instance.getAccessToken();
    const refreshToken = LocalDatabase.instance.getRefreshToken();
    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
        headers["Refresh-Token"] = `Bearer ${refreshToken}`;
    }

    return headers;
}
