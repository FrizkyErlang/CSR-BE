const Todo = require("./model");

exports.getTodo = async (req, res, next) => {
  try {
    let query = {};
    if (req.query.text) query.text = req.query.text;
    if (req.query.isCompleted) {
      if (req.query.isCompleted === "true") query.isCompleted = true;
      else query.isCompleted = false;
    }

    let result = await Todo.find(query);

    res.status(200).send({ result });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).send(err.message);
  }
};
