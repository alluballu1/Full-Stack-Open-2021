
import { Link } from "react-router-dom"
const Blog = ({ currentBlog }) => {
    return (
        <tr className="bloginfo">
            <td>
                <Link to={`/blogs/${currentBlog.id}`}>{currentBlog.title} {currentBlog.author}</Link>
            </td>

        </tr>
    )
}

export default Blog
