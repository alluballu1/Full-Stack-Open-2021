
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { newComment } from "../reducers/commentReducer"

const SeparateBlog = ({ blogs,userData, deletion, likeFunct  }) => {
    const id = useParams().id
    const dispatch = useDispatch()
    const blogIndex = blogs.findIndex(element => element.id === id)
    const usedBlog = blogs[blogIndex]
    const comments = useSelector(state => state.comments)
    const filteredComments = comments.filter(element => element.BlogId === usedBlog.id)

    const submitComment = (event) => {
        event.preventDefault()
        const comment = { content: document.getElementById("comment").value, BlogId: usedBlog.id }
        dispatch(newComment(comment))
    }

    return (
        <div>
            <h1>

                {usedBlog.title} {usedBlog.author}
            </h1>
            <table>
                <tbody>
                    <tr>
                        <td>
                            Url:
                        </td>
                        <td>
                            <a href={usedBlog.url}>{usedBlog.url}</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Likes:
                        </td>
                        <td>
                            {usedBlog.likes} <button className="likeButton" onClick={() => likeFunct(usedBlog)}>like</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            User:
                        </td>
                        <td>
                            {usedBlog.user.name}
                        </td>
                    </tr>
                </tbody>
            </table>
            {userData.username === usedBlog.user.username ? (
                <div>
                    <button className="deletionButton" onClick={() => deletion(usedBlog)}>delete</button>
                </div>
            ) : null}
            <h3>Comments</h3>
            {filteredComments.map((element, index) => {
                return (
                    <li key={index}>
                        {element.content}
                    </li>
                )
            })}
            <br />
            <form onSubmit={(event) => submitComment(event)}>
            add a new comment: <input id="comment" type="text" />
                <button>POST</button>
            </form>

        </div>

    )
}

export default SeparateBlog