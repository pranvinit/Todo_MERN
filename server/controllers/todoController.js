const { StatusCodes } = require("http-status-codes");
const Todo = require("../models/Todo");

const getAllTodos = async (req, res) => {
  const todos = await Todo.find({}).sort("-updatedAt");
  res.status(StatusCodes.OK).json({ todos, nbHits: todos.length });
};

// only accessible to authenticated users
const getSingleTodo = async (req, res) => {
  const { id: todoId } = req.params;
  const todo = await Todo.findOne({ _id: todoId });
  if (!todo) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(`No TODO with id : ${todoId}`);
  }
  res.status(StatusCodes.OK).json({ todo });
};

const createTodo = async (req, res) => {
  const { name, description, completed } = req.body;
  if (!name || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all the values" });
  }
  const todo = await Todo.create({ name, description, completed: !!completed });
  res
    .status(StatusCodes.CREATED)
    .json({ todo, msg: "TODO created successfully" });
};

const updateTodo = async (req, res) => {
  const { id: todoId } = req.params;
  const { name, description, completed } = req.body;
  if (!name || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all the values" });
  }
  const todo = await Todo.findOneAndUpdate(
    { _id: todoId },
    { name, description, completed },
    {
      runValidators: true,
      new: true,
    }
  );
  res.status(StatusCodes.OK).json({ todo, msg: "TODO updated successfully" });
};

const deleteTodo = async (req, res) => {
  const { id: todoId } = req.params;
  const todo = await Todo.findOne({ _id: todoId });
  if (!todo) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(`No TODO with id : ${todoId}`);
  }
  await todo.remove();
  res
    .status(StatusCodes.OK)
    .json({ msg: "TODO deleted succesfully, redirecting.." });
};

module.exports = {
  getAllTodos,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
