import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import counterReducer from "./reducer";

const store = createStore(counterReducer);

const App = () => {
  const callFunct = (type) => {
    store.dispatch({
      type: type,
    });
  };

  return (
    <div>
      <button onClick={() => callFunct("GOOD")}>good</button>
      <button onClick={() => callFunct("OK")}>ok</button>
      <button onClick={() => callFunct("BAD")}>bad</button>
      <button onClick={() => callFunct("ZERO")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
