import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { login } from "../services";

const Login = ({ show, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [logging, result] = useMutation(login, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });
  const submit = async (event) => {
    event.preventDefault();

    logging({ variables: { username, password } });
  };

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("phonenumbers-user-token", token);
    }
  }, [result.data]); // eslint-disable-line

  if (show === false) {
    return null;
  }
  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
