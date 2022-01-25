const express = require("express");
const router = express.Router();

// auth routes imports
const authenticateUser = require("../middleware/authenticate");

const {
  getAllTodos,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.route("/").get(getAllTodos).post(createTodo);
router
  .route("/:id")
  // change this route to auth only
  .get(getSingleTodo)
  .patch(updateTodo)
  .delete(deleteTodo);

module.exports = router;
