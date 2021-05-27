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
    }
}
