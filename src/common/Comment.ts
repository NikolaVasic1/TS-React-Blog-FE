import { User } from "./User";

export interface Comment {
    id: number;
    user_id: number;
    post_id: number;
    content: string;
    is_approved: boolean,
    author: User | null;
}
