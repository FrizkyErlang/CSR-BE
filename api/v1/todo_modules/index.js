const express = require("express");
const todoController = require("./controller");

const router = express.Router();

// const db = mongo(`${process.env.DB_URL}/CSR`, ["todos"]);

router.route("/").get(todoController.getTodo).post(todoController.createTodo);

router.route("/:id").delete(todoController.deleteTodo);

router.put("/:id", function (req, res, next) {
  let todo = req.body;
  if (!todo.text || !(todo.isCompleted + "")) {
    res.status(400);
    res.json({
      error: "Invalid Data",
    });
  } else {
    db.todos.replaceOne(
      {
        _id: db.ObjectId(req.params.id),
      },
      todo,
      {},
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  }
});

module.exports = router;
