import React, { useState, useEffect } from "react";
import Names from "./Components/Names";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const submitFunction = (event) => {
    event.preventDefault();
    if (
      persons.findIndex(
        (item) => item.name === document.getElementById("name").value
      ) === -1
    ) {
      setPersons([
        ...persons,
        {
          name: document.getElementById("name").value,
          number: document.getElementById("num").value,
        },
      ]);
      setNewName("");
      setNewNum("");
    } else {
      alert(
        `${document.getElementById("name").value} is already added to phonebook`
      );
    }
  };

  const inputNameChange = (item) => {
    setNewName(item.target.value);
  };
  const inputNumChange = (item) => {
    setNewNum(item.target.value);
    console.log(newNum);
  };
  const inputFilterChange = (item) => {
    setNewFilter(item.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={newFilter} filterInput={inputFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        nameValue={newName}
        nameChangeFunction={inputNameChange}
        numValue={newNum}
        numChangeFunction={inputNumChange}
        submit={submitFunction}
      />
      <h2>Numbers</h2>
      <Names
        persons={persons.filter(
          (item) =>
            item.name.toLowerCase().includes(newFilter.toLowerCase()) === true
        )}
      />
    </div>
  );
};

export default App;
