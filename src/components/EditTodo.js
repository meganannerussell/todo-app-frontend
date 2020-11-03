import React, { Fragment, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Modal, Input, Icon } from "semantic-ui-react";
import { getTodos } from "./actions";
import { apiBaseUrl } from "../App";

const EditTodo = ({ todo, setTodos }) => {
  const [description, setDescription] = useState(todo.description);
  // const [open, setOpen] = useState(true)

  const fetchTodos = async () => {
    const fetchedTodos = await getTodos();
    setTodos(fetchedTodos);
  };

  const editDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `${apiBaseUrl}/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      setOpen(false);
      await fetchTodos();
      // console.log(response)
    } catch (e) {
      console.log(e);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button
            style={{ backgroundColor: "white", color: "#4FB749" }}
            icon="pencil alternate icon"
          />
        }
        // trigger={<Icon class="pencil alternate icon" style={{color: "green"}}/>}
      >
        <Modal.Description>
          <div style={{ padding: 30, textAlign: "center" }}>
            <h3>Edit description</h3>
            <Input
              value={description}
              style={{ width: "80%", margin: 10 }}
              onChange={editDescription}
            ></Input>
          </div>
        </Modal.Description>
        <Modal.Actions>
          <Button color="grey" onClick={(e) => handleEdit(e)}>
            {" "}
            Edit
          </Button>
          <Button color="grey" onClick={() => setOpen(false)}>
            {" "}
            Exit
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

export default EditTodo;
