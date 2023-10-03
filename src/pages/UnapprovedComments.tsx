import { useEffect, useState } from "react";
import SingleComment from "../components/SingleComment";
import { Comment } from "../common/Comment";
import useLogedUser from "../hooks/useLogedUser";
import CommentService from "../services/comment.service";

const UnapprovedComments = () => {

    const [allComments, setAllComments] = useState<Comment[]>([]);
    const [haveComments, setHaveComments] = allComments.length > 0 ? useState(true) : useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const { user, setUser } = useLogedUser();

    useEffect(() => {
        CommentService.getNotApprovedComments()
            .then((res) => {
                setIsLoading(false);
                setAllComments(res.data.data);
                setHaveComments(true);
                setError(null);
            }).catch(err => {
                setIsLoading(false);
                setError(err.message);
            })
    }, [])

    function handleDeleteComment(id: number): void {
        let newAllComments: Comment[] = [];
        CommentService.deleteComment(id)
            .then(() => {
                newAllComments = allComments.filter(singleComment => singleComment.id !== id)
                setAllComments(newAllComments);
                if (!newAllComments.length) {
                    setHaveComments(false);
                }
            }).catch(err => {
                setError(err.message);
            })
    }

    function handleApproveComment(id: number): void {
        let newAllComments: Comment[] = [];
        CommentService.approveComment(id)
            .then(() => {
                newAllComments = allComments.filter(singleComment => singleComment.id !== id)
                setAllComments(newAllComments);
                if (!newAllComments.length) {
                    setHaveComments(false);
                }
            }).catch(err => {
                setError(err.message);
            })
    }

    return (
        <div className="posts mt-3 text-light">
            <h2 className="text-center mb-5">Unapproved Comments</h2>
            <div className="container mb-5">
                {
                    <>
                        {!haveComments && !isLoading && <p className="no_comments">No comments yet.</p>}
                        {haveComments &&
                            allComments.map((comment) => (
                                <SingleComment comment={comment} key={comment.id} user={user} handleDeleteComment={handleDeleteComment} handleApproveComment={handleApproveComment} />
                            ))
                        }
                    </>
                }
                {isLoading && <div className="spinner-border" role="status"><span className="sr-only"></span></div>}
                {error}
            </div>
        </div>
    );

}

export default UnapprovedComments