import { Image, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import image from "../assets/NotFound.png";
import { User } from "../common/User";


const NotFound = ({ user }: { user?: User }) => {

    if (!user) {
        return (
            <div className="container mx-auto">
                <div className="image mx-auto"><Image src={image} alt={"NotFound"} fluid /></div>
                <Alert variant='warning' className="bg-dark">
                    Page not found. Please visite{' '}
                    <Alert.Link href="/login">Login</Alert.Link> page.
                </Alert>
            </div>

        )
    } else {
        return (
            <div className="container mx-auto">
                <div className="image mx-auto"><Image src={image} alt={"NotFound"} fluid /></div>
                <Alert variant='warning' className="bg-dark">
                    Page not found. Please visite{' '}
                    <Alert.Link as={Link} to="/">Home</Alert.Link> page.
                </Alert>
            </div>
        )
    }


}

export default NotFound;