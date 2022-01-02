import blogsService from "../services/blogs"


export const initializeComments = () => {
    return async dispatch => {
        const allComments = await blogsService.getComments()
        dispatch({
            type: "INIT_COMMENTS",
            data:allComments
        })
    }
}

export const newComment = (data) => {
    return async dispatch => {
        const newComment = await blogsService.postComments(data)
        dispatch({
            type: "NEW_COMMENT",
            data:newComment
        })
    }
}

const commentReducer = (state = [], action) => {
    switch (action.type) {
    case "INIT_COMMENTS":
        return action.data
    case "NEW_COMMENT":
        return [...state, action.data]
    default:
        return state
    }
}

export default commentReducer