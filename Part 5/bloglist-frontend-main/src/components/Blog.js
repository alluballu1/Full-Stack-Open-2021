/* eslint-disable react/prop-types */
import { useState } from "react"
import "../style/bloginfo.css"
const Blog = ({ currentBlog, userData, deletion, likeFunct }) => {
    const [visibility, setvisibility] = useState(false)

    return (
        <div className="bloginfo">
            {visibility ? (
                <div>
                    {currentBlog.title} {currentBlog.author}{" "}
                    <button onClick={() => setvisibility(!visibility)}>hide</button>
                    <br />
          url: {currentBlog.url}
                    <br />
          likes: {currentBlog.likes}{" "}
                    <button className="likeButton" onClick={() => likeFunct(currentBlog)}>like</button>
                    <br />
          User: {currentBlog.user.name}
                    <br />
                    {userData.username === currentBlog.user.username ? (
                        <div>
                            <button className="deletionButton" onClick={() => deletion(currentBlog)}>delete</button>
                        </div>
                    ) : null}
                </div>
            ) : (
                <div>
                    {currentBlog.title} {currentBlog.author}{" "}
                    <button className="toggleVisibility" onClick={() => setvisibility(!visibility)}>view</button>
                </div>
            )}
        </div>
    )
}

export default Blog
