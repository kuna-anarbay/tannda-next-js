export const URLPath = {
    category: {
        base: "/category"
    },
    content: {
        base: (id: number) => {
            return`/course/${id}/content`
        }
    },
    course: {
        base: "/course",
        byId: (id) => `/course/${id}`
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
