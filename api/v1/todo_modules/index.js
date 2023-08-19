const express = require("express");
const todoController = require("./controller");

const router = express.Router();

router.route("/").get(todoController.getTodo).post(todoController.createTodo);

router
  .route("/:id")
  .get(todoController.getTodoById)
  .delete(todoController.deleteTodo)
  .put(todoController.updateTodo);

module.exports = router;
