import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import UserService from "../services/user.service";
import { User } from "../common/User";

interface DeleteUserModalProps {
    user: User;
    show: boolean;
    onHide: () => void;
    data: User[];
    setData: (a: User[]) => void;
}

const DeleteUserModal = ({ user, show, onHide, data, setData }: DeleteUserModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = () => {
        setIsLoading(true);

        UserService.deleteUser(user.id)
            .then(() => {
                setIsLoading(false);
                data = data.filter((singleUser: User) => singleUser.id !== user.id);
                setData(data);
                onHide();
            }).catch(err => {
                setIsLoading(false);
                setError(err.response.data.message);
            })
    }

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            onHide={onHide}
            centered
        >
            <Modal.Header className="bg-dark">
                <Modal.Title id="contained-modal-title-vcenter">
                    Confirm Delete
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
                <p>
                    Are you sure you want to delete {user.full_name}.
                </p>
                {error && <div className="mb-2 text-danger">{error}</div>}
            </Modal.Body>
            <Modal.Footer className="bg-dark">
                <Button size="sm" variant="secondary" onClick={onHide}>Close</Button>
                {isLoading && <Button size="sm" variant="secondary">Deleting User...</Button>}
                {!isLoading && <Button size="sm" variant="danger" onClick={handleDelete} >Delete</Button>}
            </Modal.Footer>

        </Modal>
    );
}

export default DeleteUserModal;