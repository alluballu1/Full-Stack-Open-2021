import axios from "axios"
const baseUrl = "/api/blogs"
let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const request = await axios.get(baseUrl, { Authorization: token })
    return request.data
}

const getComments = async () => {
    const request = await axios.get(`${baseUrl}/comments`)
    console.log(request.data)
    return request.data
}

const postComments = async (data) => {
    const request = await axios.post(`${baseUrl}/comments`, data)
    return request.data
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (newObject) => {
    const url = `${baseUrl}/${newObject.id}`
    const test = {
        user: newObject.user.id,
        likes: newObject.likes,
        author: newObject.author,
        title: newObject.title,
        url: newObject.url,
    }
    const response = await axios.put(url, test)
    return response.data
}

const deletion = async (deletedObject) => {
    const config = {
        headers: { Authorization: token },
    }
    const url = `${baseUrl}/${deletedObject.id}`
    const response = await axios.delete(url, config)
    return response.data
}

export default { getAll, setToken, create, update, deletion, getComments, postComments }
