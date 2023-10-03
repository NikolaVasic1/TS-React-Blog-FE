import { Badge, Stack } from "react-bootstrap";
import { Tag } from "../common/Tag";



const TagsCard = ({ tags }: { tags: Tag[] }) => {

    return (
        <div className="d-block pb-3">
            <h3 className="tag-title">Tags:</h3>
            <div className="tags-container d-flex">
                {tags && tags.map((tag: Tag) => (
                    <Stack direction="horizontal" key={tag.id}>
                        <Badge pill bg="secondary" className="m-1">
                            {tag.name}
                        </Badge>
                    </Stack>
                ))}
            </div>
        </div>

    )

}

export default TagsCard;