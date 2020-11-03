import React, { Fragment, useEffect } from "react";
import EditTodo from "./EditTodo";
import "semantic-ui-css/semantic.min.css";
import { table, Button, Icon } from "semantic-ui-react";
import { getTodos } from "./actions";
import "./ListTodo.css"
import { apiBaseUrl } from "../App";

const ListTodos = ({ todos, setTodos }) => {
  const deleteTodo = async (id) => {
    try {
      await fetch(`${apiBaseUrl}/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTodos = async () => {
    const fetchedTodos = await getTodos();
    setTodos(fetchedTodos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const checkTodo = async (todo) => {
    const response = await fetch(
      `${apiBaseUrl}/todos/${todo.todo_id}/check`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checked: !todo.checked }),
      }
    );
    await fetchTodos();
  };

  return (
    <div style={{ textAlign: "center", width: "80%", margin: "auto" }}>
      <Fragment>
        <h1 style={{ marginTop: 40 }}>Todo List</h1>
        <div>
          <table style={{width:"100%"}} class="ui very basic table">
            <tbody>
              {todos.map((todo) => {
                return (
                  <tr className="columns" key={todo.todo_id}>
                    <td>
                      {" "}
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          defaultChecked={!!todo.checked}
                          onChange={() => checkTodo(todo)}
                        />
                      </label>
                    </td>
                    {!todo.checked ? (
                      <td style={{ text: "black" }}>{todo.description}</td>
                    ) : (
                      <td style={{ textDecoration: "line-through" }}>
                        {todo.description}
                      </td>
                    )}
                    <td style={{ width: 20 }}>
                      <EditTodo todo={todo} setTodos={setTodos} />
                    </td>
                    <td style={{ width: 20 }}>
                      <Button
                        style={{ backgroundColor: "white", color: "#B22D3D" }}
                        icon="trash"
                        onClick={() => deleteTodo(todo.todo_id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Fragment>
    </div>
  );
};

export default ListTodos;
