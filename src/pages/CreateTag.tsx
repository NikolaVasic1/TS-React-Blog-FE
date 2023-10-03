import { Button, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Tag } from "../common/Tag";
import TagService from "../services/tag.service";

const CreateTag = () => {
    const [tag, setTag] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        const data: Tag = { name: tag };
        TagService.createTag(data)
            .then(() => {
                setIsLoading(false);
                navigate('/');
            }).catch((err) => {
                setIsLoading(false);
                setError(err.response.data.error);
            })


    }

    return (
        <div className="container-fluid px-1 py-5 mx-auto">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-5 col-lg-10 col-md-9 col-11 text-center card bg-dark text-white">
                    <h3 className="mt-5">Create Tag</h3>
                    <Form className="mx-auto mt-4 col-10 col-md-8 col-lg-8" onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group className="mb-3" controlId="formGridPassword">
                                <Form.Label>New Tag</Form.Label>
                                <Form.Control type="tag"
                                    required
                                    name="tag"
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        {error && <div className="mb-2 text-danger">{error}</div>}
                        {!isLoading && <div className="d-grid mb-5 gap-2"><Button variant="primary" type="submit">Submit</Button></div>}
                        {isLoading && <div className="d-grid mb-5 gap-2"><Button variant="secondary" disabled>Adding Tag...</Button></div>}
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default CreateTag;