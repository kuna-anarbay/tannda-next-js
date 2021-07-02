export const Route = {
    about: {
        base: "/about"
    },
    auth: {
        forgotPassword: "/auth/forgot-password",
        register: "/auth/register",
        login: "/auth/login"
    },
    courses: {
        my: "/courses/my",
        new: "/courses/new",
        id: (id: number): string => `/courses/${id}`
    },
    users: {
        me: "/users/me"
    }
}
