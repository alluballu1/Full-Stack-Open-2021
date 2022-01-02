
import PropTypes from "prop-types"
import { loginFunction } from "../reducers/loginReducer"
import { useDispatch } from "react-redux"
import { Form, Button } from "react-bootstrap"

const LoginForm = ({
    password,
    setPassword,
    username,
    setUsername,
    setErrorMessage,
    login
}) => {
    const dispatch = useDispatch()
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const loginCredentials = {
                username: username,
                password:password
            }
            dispatch(loginFunction( loginCredentials ))
            setPassword("")
            setUsername("")
            login()
        } catch (exception) {
            setErrorMessage("wrong username or password")
        }
    }

    return (
        <div>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>
                        username:
                    </Form.Label>
                    <Form.Control value={username} type="text" name="username" onChange={({ target }) => setUsername(target.value)} />
                    <Form.Label>
                        password:
                    </Form.Label>
                    <Form.Control type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)} />
                    <Button variant="primary" type="submit">
            login
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}
LoginForm.PropTypes = {
    password: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setErrorMessage: PropTypes.func.isRequired,
}

export default LoginForm
