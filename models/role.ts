export enum UserRole {
    ADMIN = 'admin',
    MANAGER = 'manager'
}


export const isAdmin = (role: UserRole | null) => {
    return role === UserRole.ADMIN;
}

export const isManager = (role: UserRole | null) => {
    return role === UserRole.ADMIN || role === UserRole.MANAGER;
}