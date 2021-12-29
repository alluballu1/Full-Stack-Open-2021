const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

export const vote = (anecdote) => {
  /*   const state = initialState;
  const index = state.findIndex((element) => element.id === anecdote.id);
  state[index].votes += 1; */
  return {
    type: "VOTE",
    data: anecdote.id,
  };
};

export const addNew = (anecdote) => {
  const newAnecdote = {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
  return {
    type: "ADD_NEW",
    data: newAnecdote,
  };
};

const anecdoteReducer = (state = initialState, action) => {
  console.log("please work");
  switch (action.type) {
    case "VOTE":
      const index = state.findIndex((element) => element.id === action.data);
      state[index].votes += 1;
      return [...state];
    case "ADD_NEW":
      return [...state, action.data];
    default:
      return state;
  }
};

export default anecdoteReducer;
