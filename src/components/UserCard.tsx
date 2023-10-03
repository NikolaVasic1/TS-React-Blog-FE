import { Button, Card } from 'react-bootstrap';
import useLogedUser from '../hooks/useLogedUser';
import { Link } from 'react-router-dom';
import { User } from '../common/User';

interface UserCardProps {
    singleUser: User
    setModalShow: () => void;
    deleteUser: () => void;
}

const UserCard = ({ singleUser, setModalShow, deleteUser }: UserCardProps) => {

    const { user, setUser } = useLogedUser();

    return (
        <Card className='bg-dark text-light card d-flex flex-column'>
            <Card.Img variant="top" src="https://t3.ftcdn.net/jpg/03/70/92/84/360_F_370928450_R6g8c0j5cey86PUXE32W7KMiqIUe1fOI.jpg" />
            <Card.Body className="d-flex flex-column justify-content-end align-items-center">
                <Card.Title>{singleUser.full_name}</Card.Title>
                <Card.Text>
                    {singleUser.email}
                </Card.Text>
                <div className="d-grid gap-2 mt-3">
                    {user.is_admin && <>
                        <Button size="sm" variant="primary">Edit User</Button>
                        <Button size="sm" variant="danger" onClick={() => { setModalShow(); deleteUser(); }}>Delete User</Button></>
                    }
                    {!user.is_admin && user.id == singleUser.id &&
                        <Button size="sm" variant="primary"><Link to="/users/edit" className='remove_underline_btn text-light'>Edit Profile</Link></Button>
                    }
                </div>
            </Card.Body>
        </Card>
    );
}

export default UserCard;