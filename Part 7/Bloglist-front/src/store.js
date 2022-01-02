import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import blogReducer from "./reducers/blogReducer"
import commentReducer from "./reducers/commentReducer"
import loginReducer from "./reducers/loginReducer"
import notificationReducer from "./reducers/notificationReducer"



const reducer = combineReducers({
    notifications: notificationReducer,
    blogs: blogReducer,
    login: loginReducer,
    comments:commentReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
