const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const app = express();

const helmet = require("helmet");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(helmet());

const Todo = require("./models/Todo");

mongoose
  .connect("mongodb://127.0.0.1:27017/todo-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"))
  .catch(console.error);

app.get("/todos", async (req, res) => {
  let todos = await Todo.find({ status: { $in: ["pending", "complete"] } });
  // console.log(todos);
  // todos = todos.filter((item) => {
  //   return ["complete", "pending"].includes(item.status);
  // });
  res.json(todos);
});

app.post("/todos/new", (req, res) => {
  // console.log(req.body);
  const todo = new Todo({
    text: req.body.newTodo,
  });
  todo.save();

  res.json(todo);
});

app.post("/todos/delete/", async (req, res) => {
  const result = await Todo.findById(req.body.id);
  result.status = "deleted";

  result.save();
  res.json({ result });
});

app.get("/todos/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.status = "complete";

  todo.save();

  res.json(todo);
});

app.put("/todos/update/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.text = req.body.text;
  todo.save();
  res.json(todo);
});

app.listen(3001, () => console.log("server listening on port 3001"));
