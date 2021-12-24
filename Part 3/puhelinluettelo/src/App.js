import React, { useState, useEffect } from "react";
import Names from "./Components/Names";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import phoneBookStore from "./Stores/phoneBookStore";
import ErrorMessage from "./Components/ErrorMessage";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [messageName, setmessageName] = useState("");
  const [visibility, setvisibility] = useState(false);
  const [messageType, setmessageType] = useState("");
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const callingFunct = () => {
    phoneBookStore.getAll().then((people) => setPersons(people));
  };

  useEffect(() => {
    callingFunct();
  }, []);

  const messageFunct = (name, type) => {
    setmessageName(name);
    setmessageType(type);
    setvisibility(true);
    setTimeout(() => {
      setvisibility(false);
    }, 5000);
  };
  const submitFunction = (event) => {
    event.preventDefault();
    if (
      persons.findIndex(
        (item) => item.name === document.getElementById("name").value
      ) === -1
    ) {
      const newPerson = {
        name: document.getElementById("name").value,
        number: document.getElementById("num").value,
      };
      const tempName = document.getElementById("name").value;
      phoneBookStore.create(newPerson).then((data) => {
        console.log(data);
        const tempPerson = {
          name: data.data.name,
          number: data.data.number,
          id: data.data.id,
        };
        setPersons([...persons, tempPerson]);
        setNewName("");
        setNewNum("");
        messageFunct(tempName, "add");
      });
    } else {
      if (
        window.confirm(
          `${
            document.getElementById("name").value
          } is already added to phonebook, do you want to update the number?`
        ) &&
        document.getElementById("name") !== "" &&
        document.getElementById("num") !== ""
      ) {
        const newnumber = document.getElementById("num").value;
        const indexOf = persons.findIndex(
          (element) => element.name === document.getElementById("name").value
        );
        let tempIndex = persons[indexOf].id;
        phoneBookStore.update(tempIndex, newnumber, persons[indexOf].name);
        const tempArray = [...persons];
        tempArray[indexOf].number = newnumber;
        setPersons(tempArray);
      }
    }
  };

  // changed the index splicing to filtration
  const deletionFunct = (item, name) => {
    console.log(item);
    setPersons(persons.filter((element) => element.id !== item));
    if (window.confirm("Delete " + name + "?")) {
      phoneBookStore
        .deleteNum(item)
        .then((response) => console.log(response.statusText))
        .catch((err) => messageFunct(name, "missing"));
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
      {!visibility ? null : (
        <ErrorMessage name={messageName} type={messageType} />
      )}

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
        deletion={(value, name) => deletionFunct(value, name)}
        persons={persons.filter(
          (item) =>
            item.name.toLowerCase().includes(newFilter.toLowerCase()) === true
        )}
      />
    </div>
  );
};

export default App;
