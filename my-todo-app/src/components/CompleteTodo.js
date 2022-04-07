import api from "../utils/api";
import { DeleteTodo } from "../components/DeleteTodo";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const CompleteTodo = ({ todos, setTodos }) => {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const completeTodo = async (id, idx) => {
    try {
      const res = await api.get("/todos/complete/" + id);
      let todo = [...todos];
      const obj = { ...todo[idx] };
      obj.status = res.data.status;
      todo[idx] = obj;

      setTodos(todo);
    } catch (e) {
      console.log("error :", e);
    }
  };

  useEffect(() => {
    GetTodos();
  }, []);

  // useEffect(() => {
  //   console.log("useeffect todo", todos);
  // }, [todos]);

  const GetTodos = async () => {
    try {
      const res = await api.get("/todos/");
      setTodos(res.data);
      dispatch({
        type: "ADD_TODO",
        payload: res.data,
      });
    } catch (e) {
      console.log("error :", e);
    }
  };
  return todos.map((todo, idx) => (
    <div key={todo._id} className="todo">
      <div
        className={"db" + (todo.status === "complete" ? " is-complete" : "")}
        onClick={() => completeTodo(todo._id, idx)}
      >
        <div className="checkbox"></div>
        <div className="text">{todo.text}</div>
      </div>

      <DeleteTodo id={todo._id} GetTodos={GetTodos} todo={todo} />
    </div>
  ));
};
