const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "complete", "deleted"],
    default: "pending",
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
