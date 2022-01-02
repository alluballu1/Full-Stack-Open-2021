import _ from "lodash"
import { useHistory } from "react-router-dom"
import "../style/userlist.css"

const UsersList = ({ users }) => {
    const temp = _.map(users, each => each)
    const usedList = _.map(temp, each => each.user)
    const unique = _.uniqBy(usedList, function (element) { return element.username })
    const history = useHistory()
    return (

        <div>
            <h2>Users</h2>
            <table >
                <thead>
                    <tr>
                        <th>
                        Username
                        </th>
                        <th>
                        Blogs created
                        </th>
                    </tr>
                </thead>
                {unique.map((element, index) => {
                    return (
                        <tr key={index}>
                            <td>

                                <a href="" onClick={() => history.push(`/users/${element.id}`)}>{element.username}</a>
                            </td>
                            <td>
                                {element.blogs.length}
                            </td>
                        </tr>
                    )})}
            </table>

        </div>
    )
}


export default UsersList