export const Route = {
    auth: {
        forgotPassword: "/auth/forgot-password",
        register: "/auth/register",
        login: "/auth/login"
    },
    courses: {
        my: "/courses/my",
        new: "/courses/new",
        id: (id: number) => `/courses/${id}`
    }
}
