import loginService from "../services/login"
import blogService from "../services/blogs"
import PropTypes from "prop-types"

const LoginForm = ({
    password,
    setPassword,
    username,
    setUsername,
    setUser,
    setErrorMessage,
}) => {
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })
            setUser(user)
            blogService.setToken(user.token)
            setPassword("")
            window.localStorage.setItem("loggedUser", JSON.stringify(user))
        } catch (exception) {
            setErrorMessage("wrong username or password")
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
          username{" "}
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
          password{" "}
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}
LoginForm.PropTypes = {
    password: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    setErrorMessage: PropTypes.func.isRequired,
}

export default LoginForm
