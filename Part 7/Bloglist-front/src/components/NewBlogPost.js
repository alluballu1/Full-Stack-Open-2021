import { useState } from "react"
import { useDispatch } from "react-redux"
import { addNewBlog } from "../reducers/blogReducer"
const NewBlogPost = ({ newBlog }) => {

    const dispatch = useDispatch()
    const [title, settitle] = useState("")
    const [author, setauthor] = useState("")
    const [url, seturl] = useState("")
    const [addNewVisibility, setaddNewVisibility] = useState(false)

    const submitFunction = (event) => {
        event.preventDefault()
        const newPost = {
            title: title,
            author: author,
            url: url,
        }
        dispatch(addNewBlog(newPost))
        newBlog(newPost)
        settitle("")
        seturl("")
        setauthor("")
        setaddNewVisibility(!addNewVisibility)
    }

    const cancelSubmit = () => {
        setaddNewVisibility(!addNewVisibility)
        settitle("")
        seturl("")
        setauthor("")
    }

    return (
        <div>
            {addNewVisibility ? (
                <div>
                    <form onSubmit={submitFunction}>
                        <table>
                            <tr>
                                <td>Title: </td>
                                <td>
                                    <input
                                        type="text"
                                        value={title}
                                        id="title"
                                        onChange={({ target }) => settitle(target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Author: </td>
                                <td>
                                    <input
                                        type="text"
                                        id="author"
                                        value={author}
                                        onChange={({ target }) => setauthor(target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Url: </td>
                                <td>
                                    <input
                                        type="text"
                                        id="url"
                                        value={url}
                                        onChange={({ target }) => seturl(target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button style={{ width:"100%", backgroundColor:"white", borderRadius:20 }} id="submitnew" type="submit">submit</button>
                                </td>
                                <td>
                                    <button style={{ width:"100%", backgroundColor:"white", borderRadius:20 }} onClick={() => cancelSubmit()}>cancel</button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            ) : (
                <button id="newblog" onClick={() => setaddNewVisibility(!addNewVisibility)}>
          add new blog
                </button>
            )}
        </div>
    )
}

export default NewBlogPost
