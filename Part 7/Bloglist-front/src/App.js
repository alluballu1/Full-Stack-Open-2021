import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/loginForm"
import LogOut from "./components/logOut"
import NewBlogPost from "./components/NewBlogPost"
import Notification from "./components/Notification"
import { newNotification } from "./reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { initializeBlogs, likeFunction, deletionFunction } from "./reducers/blogReducer"
import { localStorageLogin, logOut } from "./reducers/loginReducer"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import UsersList from "./components/UsersList"
import SeparateUser from "./components/SeparateUser"
import SeparateBlog from "./components/SeparateBlog"
import { initializeComments } from "./reducers/commentReducer"
import { Nav, Navbar, Table } from "react-bootstrap"

const App = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const login = useSelector(state => state.login)
    const blogsList = useSelector(state => state.blogs)

    // fetch all blog data

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeComments())
    }, [dispatch])

    // fetch user data and check if the last logged in person's data is in local storage

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(localStorageLogin(user))
        }
    }, [])

    // deletion function with a popup confirmation

    const deletionHandler = (deletedObject) => {
        if (
            window.confirm(
                `Remove blog ${deletedObject.title} by ${deletedObject.author}`
            )
        ) {
            dispatch(deletionFunction(deletedObject,blogsList))
        }
    }
    const ResponsiveMenu = () => {
        const padding = {
            paddingRight: 5,
            color:"whtie"
        }
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/blogs">notes</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/users">users</Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }




    return (
        <div className="container">
            {login === null && (
                <div>
                    <h2>Log in</h2>
                    <Notification/>
                    <LoginForm
                        password={password}
                        setPassword={setPassword}
                        username={username}
                        setUsername={setUsername}
                        setErrorMessage={(value) => dispatch(useDispatch(value, 5))}
                    />
                </div>
            )}

            {login !== null && (
                <Router>
                    <ResponsiveMenu />
                    <LogOut user={login.name} setUser={() => dispatch(logOut())} />
                    <Switch>
                        <Route path={"/blogs/:id"}>
                            <SeparateBlog
                                likeFunct={(value) => dispatch(likeFunction(value, blogsList))}
                                deletion={(value) => deletionHandler(value)}
                                userData={login} blogs={blogsList}/>
                        </Route>

                        <Route path={"/blogs"}>
                            <div>
                                <h2>post new</h2>
                                <NewBlogPost
                                    newBlog={(value) => {
                                        dispatch(newNotification( `a new blog ${value.title} by ${value.author} added`, 5))
                                    }}
                                />
                                <h2>blogs</h2>
                                <Notification />
                                <Table striped>
                                    <tbody>
                                        {blogsList
                                            .sort((a, b) => b.likes - a.likes)
                                            .map((blog) => (
                                                <Blog
                                                    likeFunct={(value) => dispatch(likeFunction(value, blogsList))}
                                                    deletion={(value) => deletionHandler(value)}
                                                    key={blog.id}
                                                    currentBlog={blog}
                                                    userData={login}
                                                />
                                            ))}
                                    </tbody>

                                </Table>

                            </div>
                        </Route>
                        <Route path={"/users/:id"}>
                            <SeparateUser blogs={blogsList}/>
                        </Route>
                        <Route path={"/users"}>
                            <UsersList users={blogsList} />
                        </Route>

                    </Switch>

                </Router>

            )}
        </div>
    )
}

export default App
