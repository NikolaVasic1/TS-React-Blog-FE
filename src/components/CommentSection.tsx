import React, { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import CommentService from "../services/comment.service";
import useLogedUser from "../hooks/useLogedUser";
import SingleComment from "./SingleComment";
import { Comment } from "../common/Comment";

type CommentsSectionProps = {
    singlePostId: number;
    comments: Comment[];
}

const CommentSection = ({ singlePostId, comments }: CommentsSectionProps) => {
    const [newComment, setNewComment] = useState<string>("");
    const [allComments, setAllComments] = useState<Comment[]>(comments);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [haveComments, setHaveComments] = allComments.length ? useState(true) : useState(false);
    const { user, setUser } = useLogedUser();

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const user_id = user.id
        const post_id = singlePostId;
        const content = newComment;
        const comment = { user_id, post_id, content };

        CommentService.addPostComment(comment)
            .then((res) => {
                setIsLoading(false);
                setAllComments([...allComments, res.data]);
                setHaveComments(true);
                setError(null);
                setNewComment('');
            }).catch(err => {
                setIsLoading(false);
                setError(err.message);
            })
    }



    const handleDeleteComment = (id: number) => {
        let newAllComments: Comment[] = [];
        CommentService.deleteComment(id)
            .then(() => {
                newAllComments = allComments.filter(singleComment => singleComment.id !== id)
                setAllComments(newAllComments);
                if (!newAllComments.length) {
                    setHaveComments(false);
                }
            }).catch(err => {
                setError(err.message);//test
            })
    }


    return (
        <div className="new_comment_section bg-dark p-3 text-light rounded mb-3">
            <h3 className="comment_heading">Add New Comment</h3>
            <Form onSubmit={handleCommentSubmit} >
                <FloatingLabel
                    controlId="floatingTextarea"
                    label="Leave a comment here"
                    className="bg-dark mb-2">
                    <Form.Control as="textarea" required placeholder="" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                </FloatingLabel>
                {!isLoading && <Button variant="primary" type="submit" size='sm' >Comment</Button>}
                {isLoading && <Button variant="secondary" type="submit">Adding Comment...</Button>}
            </Form>
            {error && <div className="mb-2 text-danger">{error}</div>}
            <div className="comment_section mt-4">
                <h3 className="comment_heading" >Comments</h3>
                {!haveComments && <p className="no_comments">No comments yet.</p>}
                {haveComments &&
                    allComments?.map((comment) => (
                        <SingleComment comment={comment} key={comment.id} user={user} handleDeleteComment={handleDeleteComment} />
                    ))
                }
            </div>

        </div>
    );
}

export default CommentSection;