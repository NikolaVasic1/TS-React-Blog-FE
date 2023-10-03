import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import UserService from "../services/user.service";
import { useNavigate } from "react-router-dom";
import { User } from "../common/User";

interface EditUserProps {
    user: User
    setUser: (obj: User) => void;
}

const EditUser = ({ user, setUser }: EditUserProps) => {
    const [firstname, setFirstName] = useState(user.firstname);
    const [lastname, setLastName] = useState(user.lastname);
    const [nickname, setNickname] = useState(user.nickname);
    const [email, setEmail] = useState(user.email);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { firstname, lastname, nickname, email }
        setIsLoading(true);
        UserService.editUser(user.id, data)
            .then(res => {
                setIsLoading(false);
                setUser(res.data);
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
                    <h3 className="mt-5">Edit Profile</h3>
                    <Form className="mx-auto mt-4 col-10 col-md-8 col-lg-8" onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    required
                                    value={firstname}
                                    onChange={(e) => setFirstName(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formGridLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    required
                                    value={lastname}
                                    onChange={(e) => setLastName(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formGridNickname">
                                <Form.Label>Nickname</Form.Label>
                                <Form.Control
                                    required
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group className="mb-3" controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        {error && <div className="mb-2 text-danger">{error}</div>}
                        {!isLoading && <div className="d-grid mb-5 gap-2"><Button variant="primary" type="submit">Submit</Button></div>}
                        {isLoading && <div className="d-grid mb-5 gap-2"><Button variant="secondary" type="submit">Editing User...</Button></div>}
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default EditUser;