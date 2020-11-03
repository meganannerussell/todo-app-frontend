import React, { Fragment, useState } from "react";
import "./App.css";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodo";
import wave from "./images/largewave.jpg";

const env = runtimeEnv();

export const apiBaseUrl = env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  const [todos, setTodos] = useState([
    // { description: "wash my car", checked: false },
    // {
    //   description: "do work",
    //   checked: false,
    // },
  ]);

  return (
    <Fragment style={{ height: "100%", backgroundColor: "blue" }}>
      {/* <img style={{ position: "absolute", height: "100%", width: '100%' }} src={wave} /> */}
      <div className="outerContainer">
        <div className="inputContainer">
          <InputTodo setTodos={setTodos} />
        </div>
        <div className="listContainer">
          <ListTodos todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
