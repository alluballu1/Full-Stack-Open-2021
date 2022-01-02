
import { useSelector } from "react-redux"
const Notification = () => {

    const notification = useSelector(state => state.notifications)
    return (
        <div>

            {notification !== null &&<div>
                {notification}
            </div>}
        </div>
    )
}

export default Notification