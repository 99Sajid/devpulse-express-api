export interface IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    is_active?: boolean;
    role: "contributor" | "maintainer";
}