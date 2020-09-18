import React, { Fragment, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Modal, Input } from "semantic-ui-react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  // const [open, setOpen] = useState(true)

  const editDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      setOpen(false);
      window.location = "/";
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
        trigger={<Button>Edit</Button>}
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
            Edit
          </Button>
          <Button color="grey" onClick={() => setOpen(false)}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

export default EditTodo;
