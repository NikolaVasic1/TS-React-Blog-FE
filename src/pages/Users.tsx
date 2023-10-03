import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { Row, Col } from 'react-bootstrap';
import UserService from "../services/user.service";
import DeleteUserModal from "../components/DeleteUserModal";
import { User} from "../common/User";

const User = () => {
    const [data, setData] = useState<User[]>([]);
    const [deleteUser, setDeleteUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        UserService.getUsers()
            .then(data => {
                setIsLoading(false);
                setData(data.data[0]);
                setError(null);
            }).catch(err => {
                // auto catches network / connection error
                setIsLoading(false);
                setError(err.message);
            })
            console.log("1123");
    }, [])

    return (
        <div className="users mt-3 text-light">
            <h2 className="text-center mb-5">All Users</h2>
            <div className="container mb-5">
                {
                    <Row xs={1} md={2} lg={4} className="g-4">
                        {data && data.map((user: User) => (
                            <Col className="d-flex" key={user.id}>
                                <UserCard singleUser={user} key={user.id} setModalShow={() => setModalShow(true)} deleteUser={() => setDeleteUser(user)} />
                            </Col>

                        ))}
                    </Row>
                }
                {deleteUser && <DeleteUserModal data={data} user={deleteUser} show={modalShow} onHide={() => setModalShow(false)} setData={setData} />}
                {isLoading && <div className="spinner-border" role="status"><span className="sr-only"></span></div>}
                {error}
            </div>

        </div>
    )
}

export default User;