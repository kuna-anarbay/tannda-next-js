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
        base: "/course"
    },
    auth: {
        sendCode: "/auth/send-code",
        register: "/auth/register",
        login: "/auth/login",
        refreshToken: "/auth/refresh-token"
    }
}
