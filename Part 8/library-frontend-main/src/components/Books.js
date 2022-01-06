import React, { useState } from "react";
import _ from "lodash";
const Books = (props) => {
  const [filter, setfilter] = useState(null);
  if (!props.show) {
    return null;
  }

  const books = [...props.books.books];

  const filteredBooks = [...books].filter((element) =>
    element.genres.includes(filter)
  );
  const tempList = [...books];
  const arrayOfGenres = tempList.map((element) => [element.genres]);
  const merger = _.spread(_.union);
  const result = merger(merger(arrayOfGenres));

  const valuechanger = () => {
    if (document.getElementById("genreSelect").value === "NO FILTER") {
      setfilter(null);
      return;
    }
    setfilter(document.getElementById("genreSelect").value);
  };

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          {filter === null ? (
            <div>
              <tr>
                <th>title</th>
                <th>author</th>
                <th>published</th>
              </tr>
              {books.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </div>
          ) : (
            <div>
              <tr>
                <th>title</th>
                <th>author</th>
                <th>published</th>
              </tr>
              {filteredBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </div>
          )}
        </tbody>
      </table>
      <br />
      <div>
        select a genre
        <select onChange={() => valuechanger()} name="genre" id="genreSelect">
          <option value={null}>NO FILTER</option>
          {result.map((item, index) => {
            return <option value={item}>{item}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default Books;
