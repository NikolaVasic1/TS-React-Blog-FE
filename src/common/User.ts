export interface User {
    id: number;
    firstname: string;
    lastname: string;
    full_name?: string;
    nickname?: string;
    email: string;
    is_admin: boolean
}