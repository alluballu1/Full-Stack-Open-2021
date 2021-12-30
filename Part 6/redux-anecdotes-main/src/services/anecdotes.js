import axios from "axios";

const url = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};

const newPost = async (post) => {
  const object = {
    content: post,
    id: (100000 * Math.random()).toFixed(0),
    votes: 0,
  };
  const response = await axios.post(url, object);
  return response.data;
};

const update = async (anecdote) => {
  const response = await axios.put(`${url}/${anecdote.id}`, {
    votes: anecdote.votes + 1,
    content: anecdote.content,
  });
  console.log(response.data);
  return response.data;
};

export default { getAll, newPost, update };
