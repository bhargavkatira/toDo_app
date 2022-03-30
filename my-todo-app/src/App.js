import "./App.css";
import { useState, useEffect } from "react";
const API = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch(API + "/todos/")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error : ", err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(API + "/todos/complete/" + id).then((res) =>
      res.json()
    );
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };

  const deleteTodo = async (id) => {
    console.log("string delete");
    const data = await fetch(API + "/todos/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
    GetTodos();
  };

  const addTodo = async () => {
    const data = await fetch(API + "/todos/new", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());
    setTodos([...todos, data]);
    setPopupActive(false);
    setNewTodo("");
  };
  return (
    <div className="App">
      <h1>ToDo App</h1>
      <h4>Your Tasks</h4>

      <div className="todos">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div key={todo._id} className="todo">
              <div
                className={"db" + (todo.complete ? " is-complete" : "")}
                onClick={() => completeTodo(todo._id)}
              >
                <div className="checkbox"></div>
                <div className="text">{todo.text}</div>
              </div>
              <div
                className={"delete-todo" + (todo.complete ? " is-done" : "")}
                onClick={() => deleteTodo(todo._id)}
              >
                x
              </div>
            </div>
          ))
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
}

export default App;
