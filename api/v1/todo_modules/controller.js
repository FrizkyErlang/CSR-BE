const Todo = require("./model");
const { Types, ObjectId } = require("mongoose");

exports.getTodo = async (req, res, next) => {
  try {
    // set query
    let query = {};
    if (req.query.text) query.text = req.query.text;
    if (req.query.isCompleted) {
      if (req.query.isCompleted === "true") query.isCompleted = true;
      else query.isCompleted = false;
    }

    //do the query
    let result = await Todo.find(query);

    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).send(err.message);
    next();
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    let todoId = req.params.id;

    //do the query
    let result = await Todo.findById(todoId);

    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).send(err.message);
    next();
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    let todo = req.body;
    // check the required fields
    if (!todo.text || !(todo.isCompleted + "")) {
      return res.status(400).send("Missing required fields");
    }

    // set the _id
    todo._id = new ObjectId();

    // save to collection
    let result = await Todo.create(todo);
    result.data = todo;

    res.status(200).json({ status: "Todo created", result });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).send(err.message);
    next();
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    let todoId = req.params.id;

    // delete the todo
    let result = await Todo.findByIdAndDelete(todoId);

    // if not found
    if (!result) {
      return res.status(404).send("Todo not found");
    }

    res.status(200).json({ status: "Todo deleted", result });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).send(err.message);
    next();
  }
};

exports.updateTodo;
