import blogsServices from "../services/blogs"
import loginServices from "../services/login"
let defaultState = null

export const loginFunction = (data) => {
    return async dispatch => {
        console.log(data)
        const user = await loginServices.login(data)
        blogsServices.setToken(user.token)
        window.localStorage.setItem("loggedUser", JSON.stringify(user))
        dispatch({
            type: "LOGIN",
            data:user
        })
    }
}

export const localStorageLogin = (data) => {
    return async dispatch => {
        console.log(data)
        blogsServices.setToken(data.token)
        dispatch({
            type: "RE-LOGIN",
            data:data
        })
    }
}

export const logOut = () => {
    return async dispatch => {
        window.localStorage.removeItem("loggedUser")
        dispatch({
            type: "LOGOUT",
            data:null
        })
    }
}

const loginReducer = (state = defaultState, action) => {
    switch (action.type) {
    case "LOGIN":
        return action.data
    case "RE-LOGIN":
        return action.data
    case "LOGOUT":
        return action.data
    default:
        return state
    }
}

export default loginReducer