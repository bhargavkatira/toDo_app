import api from "../utils/api";
import { useState } from "react";
import { CompleteTodo } from "./CompleteTodo";

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = async () => {
    const res = await api.post("/todos/new", { newTodo });
    console.log("Hello", res.data);
    setTodos([...todos, res.data]);
    setPopupActive(false);
    setNewTodo("");
  };
  return (
    <div className="App">
      <h1>ToDo App</h1>
      <h4>Your Tasks</h4>

      <div className="todos">
        {todos.length > 0 ? (
          <CompleteTodo todos={todos} setTodos={setTodos} />
        ) : (
          <p className="no-task">You currently have no tasks</p>
        )}
      </div>
      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>
      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            x
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            ></input>
            <div className="button" onClick={addTodo}>
              create
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
