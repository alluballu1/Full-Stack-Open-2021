import { connect } from "react-redux";
import { addNew } from "../reducers/anecdoteReducer";
import { newNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const addNewAnecdote = async (event) => {
    event.preventDefault();
    props.addNew(document.getElementById("newAnecdote").value);
    props.newNotification(
      `${document.getElementById("newAnecdote").value} added`,
      3
    );
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
const mapDispatchToProps = {
  addNew,
  newNotification,
};
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm;
