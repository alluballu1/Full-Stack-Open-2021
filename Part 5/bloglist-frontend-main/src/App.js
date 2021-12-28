import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import LoginForm from "./components/loginForm"
import LogOut from "./components/logOut"
import NewBlogPost from "./components/NewBlogPost"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [visibility, setvisibility] = useState(false)
    const [notificationContent, setnotificationContent] = useState("")
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])



    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const deletionHandler = (deletedObject) => {
        if (
            window.confirm(
                `Remove blog ${deletedObject.title} by ${deletedObject.author}`
            )
        ) {
            const index = blogs.findIndex((element) => element === deletedObject)
            const temp = [...blogs]
            temp.splice(index, 1)
            setBlogs(temp)
            blogService.deletion(deletedObject)
        }
    }

    const newBlogFunctHandler = (value) => {
        value.user = user
        value.likes = 0
        setBlogs((arr) => [...arr, value])
        setnotificationContent(
            `a new blog ${value.title} by ${value.author} added`
        )
        setvisibility(true)
        setTimeout(() => {
            setvisibility(false)
        }, 5000)
    }
    const updateBlogFunct = (currentBlog) => {
        const item = blogs.findIndex((each) => each === currentBlog)
        const temp = [...blogs]
        temp[item].likes = temp[item].likes + 1
        setBlogs(temp)
        blogService.update(currentBlog)
    }

    const loginErrorHandler = (value) => {
        setnotificationContent(value)
        setvisibility(true)
        setTimeout(() => {
            setvisibility(false)
        }, 5000)
    }

    return (
        <div>
            {user === null ? (
                <div>
                    <h2>log in to application</h2>

                    {visibility && <div>{notificationContent}</div>}
                    <LoginForm
                        password={password}
                        setPassword={setPassword}
                        username={username}
                        setUsername={setUsername}
                        setUser={setUser}
                        setErrorMessage={(value) => loginErrorHandler(value)}
                    />
                </div>
            ) : (
                <LogOut user={user.name} setUser={(val) => setUser(val)} />
            )}

            {user !== null && (
                <div>
                    <h2>post new</h2>
                    <NewBlogPost
                        newBlog={(value) => {
                            newBlogFunctHandler(value)
                        }}
                    />
                    <h2>blogs</h2>
                    {visibility && <div>{notificationContent}</div>}
                    {blogs
                        .sort((a, b) => b.likes - a.likes)
                        .map((blog) => (
                            <Blog
                                likeFunct={(value) => updateBlogFunct(value)}
                                deletion={(value) => deletionHandler(value)}
                                key={blog.id}
                                currentBlog={blog}
                                userData={user}
                            />
                        ))}
                </div>
            )}
        </div>
    )
}

export default App
