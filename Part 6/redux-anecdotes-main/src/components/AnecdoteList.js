import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import {
  newNotification,
  hideNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotesState = useSelector((state) => state.anecdotes);
  const filterState = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const likingFunct = (prop) => {
    dispatch(vote(prop));
    dispatch(newNotification(`${prop.content} liked`, 3));
  };

  return (
    <div>
      <h2>Anecdotes</h2>

      {anecdotesState
        .filter((element) =>
          element.content.toLowerCase().includes(filterState.toLowerCase())
        )
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => likingFunct(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
