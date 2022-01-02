
import blogsServices from "../services/blogs"


export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogsServices.getAll()
        dispatch({
            type: "GET_ALL",
            data:blogs
        })
    }
}

export const addNewBlog = (data) => {
    return async dispatch => {
        const newBlog = await blogsServices.create(data)
        dispatch({
            type: "ADD_NEW",
            data:newBlog
        })
    }
}

export const likeFunction = (data, blogs) => {
    return async dispatch => {
        const item = blogs.findIndex((each) => each === data)
        const temp = [...blogs]
        temp[item].likes = temp[item].likes + 1
        await blogsServices.update(data)
        dispatch({
            type: "LIKE",
            data:temp
        })
    }
}

export const deletionFunction = (data, blogs) => {
    return async dispatch => {
        const index = blogs.findIndex((element) => element === data)
        const temp = [...blogs]
        temp.splice(index, 1)
        blogsServices.deletion(data)
        dispatch({
            type: "DELETE_BLOG",
            data:temp
        })
    }
}

const blogReducer = (state = [], action) => {
    switch(action.type){
    case "GET_ALL":
        return action.data
    case "ADD_NEW":
        return [...state, action.data]
    case "LIKE":
        return action.data
    case "DELETE_BLOG":
        return action.data
    default:
        return state
    }
}

export default blogReducer