import { Button, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import auth from "../services/auth.service";
import { User } from "../common/User";

interface LoginProps {
    setToken: (params: string) => void;
    setUser: (params: User) => void;
}

const Login = ({ setToken, setUser }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const user = { email, password }

        auth.login(user)
            .then((res) => {
                setToken(res.data.token);
                setUser(res.data.user);
                navigate('/');
            }).catch(err => {
                setError(err.response.data.message);
            })
    }

    return (
        <div className="container-fluid px-1 py-5 mx-auto">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-5 col-lg-10 col-md-9 col-11 text-center card bg-dark text-white">
                    <h3 className="mt-5">Login</h3>
                    <Form className="mx-auto mt-4 col-10 col-md-8 col-lg-8" onSubmit={handleSubmit}>
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        {error && <div className="mb-2 text-danger">{error}</div>}
                        <div className="d-grid gap-2"><Button variant="primary" type="submit">Login</Button></div>
                    </Form>
                    <p className="mt-5 small text-secondary">New to Blog ?</p>
                    <div className="d-grid gap-2 col-lg-3 mx-auto mb-4" ><Link className="btn btn-success" to="/register">Create your Account</Link></div>
                </div>
            </div>
        </div>
    );
}

export default Login;