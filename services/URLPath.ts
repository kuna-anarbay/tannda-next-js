export const URLPath = {
    course: {
        base: "/course",
        my: "/course/my",
        byId: (id: number): string => `/course/${id}`,
        members: (id: number): string => `/course/${id}/member`
    },
    member: {
        base: (courseId: number): string => `/course/${courseId}/member`,
        member: (courseId: number, userId: number): string => `/course/${courseId}/member/${userId}`
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
        base: (courseId: number): string => `course/${courseId}/content`,
        lesson: (courseId: number): string => `course/${courseId}/content/lesson`,
        assignment: (courseId: number): string => `course/${courseId}/content/assignment`,
        exam: (courseId: number): string => `course/${courseId}/content/assessment`,
        byId: (courseId: number, contentId: number): string => `/course/${courseId}/content/${contentId}`,
        upload: (courseId: number, contentId: number): string => `course/${courseId}/content/${contentId}/upload`,
        status: (courseId: number, contentId: number): string => `course/${courseId}/content/${contentId}/status`,
        members: (courseId: number, contentId: number): string => `course/${courseId}/content/${contentId}/member`,
        reorder: (courseId: number, contentId: number): string => `/course/${courseId}/content/${contentId}/reorder`
    },
    section: {
        base: (courseId: number): string => `course/${courseId}/section`,
        byId: (courseId: number, sectionId: number): string => `/course/${courseId}/section/${sectionId}`,
        reorder: (courseId: number, sectionId: number): string => `/course/${courseId}/section/${sectionId}/reorder`
    },
    presence: {
        base: (courseId: number): string => `course/${courseId}/presence`
    },
    submission: {
        base: (courseId: number): string => `course/${courseId}/submission`,
        byId: (courseId: number, relationId: number): string => `course/${courseId}/submission/${relationId}`
    }
}
