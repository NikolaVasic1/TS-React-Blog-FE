import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom';
import auth from '../services/auth.service';
import { User } from '../common/User';

interface headerProps {
    token?: string;
    user?: User
}

const Header = ({ token, user }: headerProps) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        auth.logout(token!)
            .then(() => {
                // After successful logout, clear the session storage and redirect the user to the login page
                sessionStorage.clear();
                navigate(0);
            }).catch(err => {
                console.log(err);
            })
    };

    if (!token) {
        return (
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand >Laravel - React Blog</Navbar.Brand>
                    <Nav>
                        <Nav.Link className='c-warning' as={Link} to="/register">Register</Nav.Link>
                        <Nav.Link className='c-warning' as={Link} to="/login">Login</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        );
    } else {
        return (
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand >Laravel - React Blog</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={user!.firstname + " " + user!.lastname} id="navbarUserDropdown">
                            <NavDropdown.Item as={Link} to="/users/edit">Edit Profile</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/change-password">Change Password</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/create-post">Create Post</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {user?.is_admin &&
                                <>
                                    <NavDropdown.Item as={Link} to="/create-tag">Create Tag</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/unpublished-posts">Unpublished Posts</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/unapproved-comments">Unapproved Comments</NavDropdown.Item>
                                </>
                            }
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}> Sign Out </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        )
    }


}

export default Header;