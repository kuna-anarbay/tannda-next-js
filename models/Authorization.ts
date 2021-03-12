export interface Authorization {
    role: string | null;
    needsToVerifyEmail: boolean;
    needsToChangePassword: boolean;
    needsToSetupProfile: boolean;
}