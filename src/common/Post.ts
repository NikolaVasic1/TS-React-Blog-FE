import { Comment } from "./Comment";
import { Tag } from "./Tag";
import { User } from "./User";

export interface Post {
    id: number;
    user_id: number;
    title: string;
    content: string;
    status: number;
    published: boolean;
    created_at: string;
    tags: Tag[];
    comments: Comment[];
    author: User;
}