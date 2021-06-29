export enum UserRole {
    ADMIN = 'admin',
    MANAGER = 'manager'
}

export const isManager = (role: UserRole | null): boolean => {
    return role === UserRole.ADMIN || role === UserRole.MANAGER;
}
