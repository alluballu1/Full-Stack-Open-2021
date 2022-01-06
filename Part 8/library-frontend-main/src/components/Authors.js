import { useMutation } from "@apollo/client";
import React from "react";
import { updateAuthorBirthyear, getAllPersons } from "../services";

const Authors = (props) => {
  const [authorUpdateHandler] = useMutation(updateAuthorBirthyear);
  if (!props.show) {
    return null;
  }
  const authors = [...props.authors.authors];

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      document.getElementById("authors_birthyear").value,
      document.getElementById("authors_dropdown").value
    );
    authorUpdateHandler({
      variables: {
        name: document.getElementById("authors_dropdown").value,
        born: Number(document.getElementById("authors_birthyear").value),
      },
      refetchQueries: [{ query: getAllPersons }],
    });
  };
  return (
    <div>
      <h2>authors</h2>
      <button onClick={() => console.log(props)}>sdfsdf</button>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>set birthyear</h3>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input id="authors_birthyear" type="number" />
        <select name="authors" id="authors_dropdown">
          {authors.map((each) => (
            <option value={each.name}>{each.name}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Authors;
