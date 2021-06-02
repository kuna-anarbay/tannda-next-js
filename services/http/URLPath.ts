export const URLPath = {
    content: {
        base: (id: number) => {
            return`/course/${id}/content`
        }
    },
    course: {
        base: "/course",
        byId: (id) => `/course/${id}`,
        members: (id) => `/course/${id}/member`
    },
    auth: {
        sendCode: "/auth/send-code",
        register: "/auth/register",
        login: "/auth/login",
        logOut: "/auth/log-out",
        refreshToken: "/auth/refresh-token",
        forgotPassword: "/auth/forgot-password",
        verifyPhone: "/auth/verify-phone",
        resetPassword: "/auth/reset-password"
    }
}
