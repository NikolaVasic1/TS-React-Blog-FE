import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import { User } from "../common/User";


interface RegisterProps {
    setToken: (params: string) => void;
    setUser: (params: User) => void;
}

const Register = ({ setToken, setUser }: RegisterProps) => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const user = { firstname, lastname, nickname, email, password }

        setIsLoading(true);

        UserService.registerUser(user)
            .then(res => {
                setIsLoading(false);
                setToken(res.data.token);
                setUser(res.data.user);
                navigate('/');
            }).catch(err => {
                setIsLoading(false);
                setError(err.ress.data.error);
            })

    }

    return (
        <div className="container-fluid px-1 py-5 mx-auto">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-5 col-lg-10 col-md-9 col-11 text-center card bg-dark text-white">
                    <h3 className="mt-5">Register</h3>
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

                            <Form.Group className="mb-3" controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        {error && <div className="mb-2 text-danger">{error}</div>}
                        {!isLoading && <div className="d-grid mb-5 gap-2"><Button variant="primary" type="submit">Submit</Button></div>}
                        {isLoading && <div className="d-grid mb-5 gap-2"><Button variant="primary" type="submit">Adding user...</Button></div>}
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Register;