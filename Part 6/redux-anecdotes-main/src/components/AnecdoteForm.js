import { useDispatch } from "react-redux";
import { addNew } from "../reducers/anecdoteReducer";
import {
  newNotification,
  hideNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  let timeout;
  const addNewAnecdote = (event) => {
    event.preventDefault();
    dispatch(addNew(document.getElementById("newAnecdote").value));
    clearTimeout(timeout);
    dispatch(
      newNotification(`${document.getElementById("newAnecdote").value} added`)
    );
    timeout = setTimeout(() => dispatch(hideNotification()), 5000);
  };
  return (
    <div>
      <h2>create new</h2>
      <form>
        <div>
          <input id="newAnecdote" type={"text"} />
        </div>
        <button onClick={(event) => addNewAnecdote(event)}>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
