import api from "../utils/api";

export const DeleteTodo = ({ id, todo, GetTodos }) => {
  const deleteTodo = async (id) => {
    const payload = {
      id,
    };
    console.log(id);
    const res = await api.post("/todos/delete/", payload);
    console.log(res.data);
    GetTodos();
  };

  return (
    <div
      className={"delete-todo" + (todo.complete ? " is-done" : "")}
      onClick={() => deleteTodo(id)}
    >
      x
    </div>
  );
};
