import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client";
import { getAllBooks, getAllPersons, getUserData } from "./services";
import Login from "./components/Login";
import RecommendedBooks from "./components/RecommendedBooks";

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const allBooks = useQuery(getAllBooks);
  const allPeople = useQuery(getAllPersons);
  const userData = useQuery(getUserData);
  const allAuthorsData = allPeople.data;
  const allBooksData = allBooks.data;

  useEffect(() => {
    const existingLogin = window.localStorage.getItem(
      "phonenumbers-user-token"
    );
    if (existingLogin) {
      console.log("Existing login found!");
      setToken(existingLogin);
    } else {
      console.log("No existing login found!");
    }
  }, []);

  const logOutFunct = () => {
    window.localStorage.removeItem("phonenumbers-user-token");
    setToken(null);
  };

  const logIn = (props) => {
    setToken(props);
    setPage("authors");
  };

  if (allPeople.loading || allBooks.loading || userData.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        {/* <button onClick={() => console.log(allBooks)}>test</button> */}
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token !== null && (
          <button onClick={() => setPage("add")}>add book</button>
        )}
        {token === null && (
          <button onClick={() => setPage("login")}>log in</button>
        )}
        {token !== null && (
          <button onClick={() => setPage("recommended")}>recommended</button>
        )}
        {token !== null && (
          <button onClick={() => logOutFunct()}>Log out</button>
        )}
      </div>

      <Authors authors={allAuthorsData} show={page === "authors"} />

      <Books books={allBooksData} show={page === "books"} />

      <NewBook show={page === "add"} />

      <Login show={page === "login"} setToken={(item) => logIn(item)} />

      <RecommendedBooks data={userData.data} show={page === "recommended"} />
    </div>
  );
};

export default App;
