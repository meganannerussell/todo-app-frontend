import React, { Fragment, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Input, Button } from "semantic-ui-react";
import { getTodos } from "./actions";
import { apiBaseUrl } from "../App";

const InputTodo = ({ setTodos }) => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (description !== "") {
      try {
        const body = { description };
        await fetch(`${apiBaseUrl}/todos`, {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const fetchedTodos = await getTodos();
        setTodos(fetchedTodos);
        setDescription('')
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleInput = (e) => {
    setDescription(e.target.value);
  };

  return (
    <Fragment>
      <h1 style={{ textAlign: "center", marginTop: 40 }}>What todo</h1>
      <form onSubmit={onSubmitForm}>
        <div style={{ textAlign: "center" }}>
          <Input
            style={{ width: "60%", paddingBottom: 50 }}
            type="text"
            value={description}
            onChange={handleInput}
          />
          <Button>add</Button>
        </div>
      </form>
    </Fragment>
  );
};

export default InputTodo;
