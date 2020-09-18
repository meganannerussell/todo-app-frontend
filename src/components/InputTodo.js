import React, { Fragment, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Input, Button } from "semantic-ui-react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (e) {
      console.log(e);
    }
  };

  const handleInput = (e) => {
    setDescription(e.target.value);
  };

  return (
    <Fragment>
      <h1 style={{ textAlign: "center", marginTop: 60 }}>What todo</h1>
      <form onSubmit={onSubmitForm}>
        <div style={{ textAlign: "center" }}>
          <Input
            style={{ width: "50%" }}
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
