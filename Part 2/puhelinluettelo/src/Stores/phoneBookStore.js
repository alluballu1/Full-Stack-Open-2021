import axios from "axios";

const url = "http://localhost:3001/api/persons";

const getAllData = () => {
  const request = axios.get(url);
  return request.then((response) => {
    return response.data;
  });
};
const addPerson = (newObject) => {
  return axios.post(url, newObject);
};

const updateNumber = (id, newObject, newName) => {
  return axios.put(`${url}/${id}`, { number: newObject, name: newName });
};
const deleteNum = (id) => {
  console.log(id);
  const tempUrl = url + "/" + id.toString();
  return axios.delete(tempUrl);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll: getAllData,
  create: addPerson,
  update: updateNumber,
  deleteNum: deleteNum,
};
