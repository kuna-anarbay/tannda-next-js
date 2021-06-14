export const URLPath = {
    course: {
        base: "/course",
        byId: (id) => `/course/${id}`,
        members: (id) => `/course/${id}/member`
    },
    member: {
        base: (courseId) => `/course/${courseId}/member`,
        member: (courseId, userId) => `/course/${courseId}/member/${userId}`
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
    },
    profile: {
        me: "/profile/me",
        avatar: "/profile/me/avatar"
    },
    content: {
        base: (courseId) => `course/${courseId}/content`,
        upload: (courseId, contentId) => `course/${courseId}/content/${contentId}/upload`,
        status: (courseId, contentId) => `course/${courseId}/content/${contentId}/status`,
    }
}
