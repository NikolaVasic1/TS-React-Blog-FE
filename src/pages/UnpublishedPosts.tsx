import { Row, Col } from "react-bootstrap";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import { Post } from "../common/Post";
import PostService from "../services/post.service";


const UnpublishedPost = () => {
    const [data, setData] = useState<Post[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        PostService.getUnpublishedPosts()
            .then((res) => {
                setIsLoading(false);
                setData(res.data);
                setError(null);
            }).catch((err) => {
                setIsLoading(false);
                setError(err.message);
            })
    }, [])

    return (
        <div className="posts mt-3 text-light">
            <h2 className="text-center mb-5">Unpuslished Posts</h2>
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
    );

}

export default UnpublishedPost;