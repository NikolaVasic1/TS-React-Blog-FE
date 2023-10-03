import { Button, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/post.service";
import { User } from "../common/User";
import { Tag } from "../common/Tag";
import TagService from "../services/tag.service";


const CreatePost = ({ user }: { user: User }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [allTags, setAllTags] = useState<Tag[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingTags, setIsLoadingTags] = useState<boolean>(false);
    const [tags, setTagsCheckeBoxes] = useState<number[]>([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoadingTags(true);
        TagService.getTags().then((res) => {
            setAllTags(res.data[0]);
            setIsLoadingTags(false);
        })
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const user_id = user.id;
        const status = user.is_admin ? 1 : 0; 

        const data = { user_id, title, content, status, tags }

        PostService.createPost(data)
            .then((data) => {
                setIsLoading(false);
                navigate('/posts/' + data.data.id);
            }).catch((err) => {
                setIsLoading(false);
                setError(err.response.data.error);
            })
    }

    return (
        <div className="container-fluid px-1 py-5 mx-auto">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-5 col-lg-10 col-md-9 col-11 text-center card bg-dark text-white">
                    <h3 className="mt-5">Create New Post</h3>
                    <Form className="mx-auto mt-4 col-10 col-md-8 col-lg-8" onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group className="mb-3" controlId="formGridTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGridContent">
                                <Form.Label>Content</Form.Label>
                                <Form.Control
                                    required
                                    as="textarea" rows={5}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGridTag">
                                <div className="mb-2">Tags</div>
                                {allTags && allTags.map((tag: Tag) => (
                                    <Form.Check
                                        key={`${tag.id}`}
                                        type="checkbox"
                                        id={`${tag.id}`}
                                        label={`${tag.name}`}
                                        className="tag-checkbox"
                                        onChange={(e) => !tags.includes(tag.id!) && setTagsCheckeBoxes(oldArray => [...oldArray, Number(e.target.id)])}
                                    />
                                ))}
                                {isLoadingTags && <div className="spinner-border mt-4" role="status"><span className="sr-only"></span></div>}
                            </Form.Group >

                        </Row>
                        {error && <div className="mb-2 text-danger">{error}</div>}
                        {!isLoading && <div className="d-grid mb-5 gap-2"><Button variant="primary" type="submit">Submit</Button></div>}
                        {isLoading && <div className="d-grid mb-5 gap-2"><Button variant="secondary" type="submit">Creating Post...</Button></div>}
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;