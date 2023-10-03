import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Row, Col } from 'react-bootstrap';
import PostService from "../services/post.service";
import { Post } from "../common/Post";



const Posts = () => {
    const [data, setData] = useState<Post[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        PostService.getPosts()
            .then(data => {
                setIsLoading(false);
                setData(data.data);
                setError(null);
            }).catch(err => {
                // auto catches network / connection error
                setIsLoading(false);
                setError(err.message);
            })
    }, [])

    return (
        <div className="posts mt-3 text-light">
            <h2 className="text-center mb-5">All Posts</h2>
            <div className="container mb-5">
                {
                    <Row xs={1} md={2} lg={4} className="g-4">
                        {data && data.map((post: Post) => (
                            <Col className="d-flex" key={post.id}>
                                <PostCard post={post} key={post.id} />
                            </Col>

                        ))}
                    </Row>

                }
                {isLoading && <div className="spinner-border" role="status"><span className="sr-only"></span></div>}
                {error}
            </div>
        </div>
    )
}

export default Posts;