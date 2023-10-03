import { Button } from "react-bootstrap";
import { Comment } from "../common/Comment";
import { User } from "../common/User";

interface CommentProps {
    comment: Comment;
    user: User;
    handleDeleteComment(id: number): void;
    handleApproveComment?(id: number): void;
}

const defaultHandleApproveComment = () => { };

const SingleComment = ({ comment, user, handleDeleteComment, handleApproveComment = defaultHandleApproveComment }: CommentProps) => {
    return (
        <div className="single_comment m-4">
            {comment.author !== null &&
                <div className="comment_author">
                    <div className="comment_author_icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg></div>
                    {comment.author.nickname + ':'}
                </div>}
            <span className="comment_content">{comment.content}</span>
            {(user.is_admin && !comment.is_approved) && <Button className="delete_comment_btn m-1" variant="success" size="sm" onClick={() => handleApproveComment(comment.id)}>Approve</Button>}
            {(comment.author?.id === user.id || user.is_admin) && <Button className="delete_comment_btn m-1" variant="danger" size="sm" onClick={() => handleDeleteComment(comment.id)}>Delete</Button>}
        </div>
    )

}

export default SingleComment;