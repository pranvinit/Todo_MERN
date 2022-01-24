const express = require("express");
const router = express.Router();

const {
  getAllTodos,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.route("/").get(getAllTodos).post(createTodo);
router.route("/:id").get(getSingleTodo).patch(updateTodo).delete(deleteTodo);

module.exports = router;
