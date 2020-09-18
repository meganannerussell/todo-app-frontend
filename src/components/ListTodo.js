import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import "semantic-ui-css/semantic.min.css";
import { table, Button } from "semantic-ui-react";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div style={{ textAlign: "center", width: "50%", margin: "auto" }}>
      <Fragment>
        <h1 style={{ marginTop: 40 }}>Todo List</h1>
        <div>
          <table class="ui very basic table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.todo_id}>
                  <td style={{ text: "black" }}>{todo.description}</td>
                  <td>
                    <EditTodo todo={todo} />
                  </td>
                  <td>
                    <Button onClick={() => deleteTodo(todo.todo_id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    </div>
  );
};

export default ListTodos;
