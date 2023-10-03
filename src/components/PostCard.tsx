import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Post } from '../common/Post';


const PostCard = ({ post }: { post: Post }) => {
    return (
        <Card className='bg-dark text-light card d-flex flex-column'>
            <Card.Img variant="top" src="https://img.freepik.com/premium-vector/modern-element-circle-abstract-background_551405-106.jpg" />
            <Card.Body className="d-flex flex-column justify-content-end align-items-center">
                <Card.Title className='text-wrap'>{post.title}</Card.Title>
                <Card.Text className='post-preview'>
                    {post.content}
                </Card.Text>
                <Button className='w-100' variant="light" size="sm"><Link to={'/posts/' + post.id} className='remove_underline_btn text-dark'>Read more</Link></Button>
            </Card.Body>
        </Card>
    );
}

export default PostCard;