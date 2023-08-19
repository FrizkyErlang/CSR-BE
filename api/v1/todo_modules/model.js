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
  timeStamps: {
    type: Date,
    default: new Date(),
  },
  updatedAt: Date,
});

todoScheme.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

const Todo = mongoose.model("todos", todoScheme);

module.exports = Todo;
