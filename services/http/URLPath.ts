export const URLPath = {
    course: {
        base: "/course",
        my: "/course/my",
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
        lesson: (courseId) => `course/${courseId}/content/lesson`,
        byId: (courseId, contentId) => `/course/${courseId}/content/${contentId}`,
        upload: (courseId, contentId) => `course/${courseId}/content/${contentId}/upload`,
        status: (courseId, contentId) => `course/${courseId}/content/${contentId}/status`,
        members: (courseId, contentId) => `course/${courseId}/content/${contentId}/member`,
        reorder: (courseId, contentId) => `/course/${courseId}/content/${contentId}/reorder`
    },
    section: {
        base: (courseId) => `course/${courseId}/section`,
        byId: (courseId, sectionId) => `/course/${courseId}/section/${sectionId}`,
        reorder: (courseId, sectionId) => `/course/${courseId}/section/${sectionId}/reorder`
    },
    presence: {
        base: (courseId) => `course/${courseId}/presence`
    }
}
