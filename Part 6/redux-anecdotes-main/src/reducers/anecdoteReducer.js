import anecdoteService from "../services/anecdotes";

export const vote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdoteState = await anecdoteService.update(anecdote);
    console.log(newAnecdoteState);
    dispatch({
      type: "VOTE",
      data: anecdote.id,
    });
  };
  /*   const state = initialState;
  const index = state.findIndex((element) => element.id === anecdote.id);
  state[index].votes += 1; */
};

export const addNew = (anecdote) => {
  return async (dispatch) => {
    const newAnecote = await anecdoteService.newPost(anecdote);
    dispatch({
      type: "ADD_NEW",
      data: newAnecote,
    });
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const notes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_NOTES",
      data: notes,
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const index = state.findIndex((element) => element.id === action.data);
      state[index].votes += 1;
      return [...state];
    case "ADD_NEW":
      return [...state, action.data];
    case "INIT_NOTES":
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
