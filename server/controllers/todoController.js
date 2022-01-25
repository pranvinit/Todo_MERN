const { StatusCodes } = require("http-status-codes");
const Todo = require("../models/Todo");

const getAllTodos = async (req, res) => {
  const todos = await Todo.find({}).sort("-updatedAt");
  res.status(StatusCodes.OK).json({ todos, nbHits: todos.length });
};

const getSingleTodo = async (req, res) => {
  const { id: todoId } = req.params;
  const todo = await Todo.findOne({ _id: todoId });
  if (!todo) {
    res.status(StatusCodes.NOT_FOUND).json(`No TODO with id : ${id}`);
  }
  res.status(StatusCodes.OK).json({ todo });
};

const createTodo = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all the values" });
  }
  const todo = await Todo.create({ name, description });
  res
    .status(StatusCodes.CREATED)
    .json({ todo, msg: "TODO created successfully" });
};

const updateTodo = async (req, res) => {
  const { id: todoId } = req.params;
  const { name, description, completed } = req.body;
  if (!name || !description) {
    res
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
  const todo = await Todo.findOneAndDelete({ _id: todoId });
  if (!todo) {
    res.status(StatusCodes.NOT_FOUND).json(`No TODO with id : ${id}`);
  }
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
