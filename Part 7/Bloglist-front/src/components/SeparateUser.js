import { useParams } from "react-router-dom"

const SeparateUser = ({ blogs }) => {
    const id = useParams().id
    const filteredBlogs = blogs.filter(element => element.user.id === id)
    return (
        < div >
            <h1>{filteredBlogs[0].user.username}</h1>
            <h2>Blogs</h2>
            {
                filteredBlogs.map((element, index) => {
                    return (
                        <li key={index}>
                            {element.title}
                        </li>
                    )})}
        </div>
    )

}

export default SeparateUser