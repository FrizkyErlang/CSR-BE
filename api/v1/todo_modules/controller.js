const Todo = require("./model");

exports.getTodo = async (req, res, next) => {
  try {
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

exports.createTodo = async (req, res, next) => {
  try {
    let todo = req.body;
    // check the required fields
    if (!todo.text || !(todo.isCompleted + "")) {
      return res.status(400).send("Missing required fields");
    }

    // save to collection
    let result = await Todo.create(todo);
    result.data = todo;

    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).send(err.message);
    next();
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).send(err.message);
    next();
  }
};
