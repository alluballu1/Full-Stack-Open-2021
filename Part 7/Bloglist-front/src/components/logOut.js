import blogService from "../services/blogs"


const LogOut = ({ setUser, user }) => {
    const logoutFunct = () => {
        window.localStorage.removeItem("loggedUser")
        blogService.setToken(null)
        setUser(null)
    }
    return (
        <div>
            {user} is logged in <button onClick={() => logoutFunct()}>log out</button>
        </div>
    )
}

export default LogOut
