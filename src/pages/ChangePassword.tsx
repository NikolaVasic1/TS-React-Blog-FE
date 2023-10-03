import { Button, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import { User } from "../common/User";


const ChangePassword = ({ user }: { user: User }) => {
    const [password, setPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [new_password_confirmation, setNewPasswordRepeated] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null)
        setIsLoading(true);
        const user_id = user.id
        const data = { password, new_password, new_password_confirmation }
        if (new_password !== new_password_confirmation) {
            setError("Passwords does't match");
            setIsLoading(false);
        } else {
            UserService.changePassword(user_id, data)
                .then(() => {
                    setIsLoading(false);
                    navigate('/');
                }).catch(err => {
                    setIsLoading(false);
                    setError(err.response.data.message);
                })
        }
    }

    return (
        <div className="container-fluid px-1 py-5 mx-auto">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-5 col-lg-10 col-md-9 col-11 text-center card bg-dark text-white">
                    <h3 className="mt-5">Change Password</h3>
                    <Form className="mx-auto mt-4 col-10 col-md-8 col-lg-8" onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group className="mb-3" controlId="formGridPassword">
                                <Form.Label>Current Password</Form.Label>
                                <Form.Control type="password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGridNewPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password"
                                    required
                                    name="new_password"
                                    value={new_password}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGridNewPasswordRepeated">
                                <Form.Label>Confirme New Password</Form.Label>
                                <Form.Control type="password"
                                    required
                                    name="new_password_confirmation"
                                    value={new_password_confirmation}
                                    onChange={(e) => setNewPasswordRepeated(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        {error && <div className="mb-2 text-danger">{error}</div>}
                        {!isLoading && <div className="d-grid mb-5 gap-2"><Button variant="primary" type="submit">Submit</Button></div>}
                        {isLoading && <div className="d-grid mb-5 gap-2"><Button variant="secondary" disabled>Changing password...</Button></div>}
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;