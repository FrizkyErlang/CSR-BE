const mongoose = require("mongoose");

const todoScheme = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Todo must have a text"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("todos", todoScheme);

module.exports = Todo;
