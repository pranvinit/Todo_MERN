const { StatusCodes } = require("http-status-codes");
const Todo = require("../models/Todo");

const getAllTodos = async (req, res) => {
  const todos = await Todo.find({});
  res.status(StatusCodes.OK).json({ todos, nbHits: todos.length });
};

const getSingleTodo = async (req, res) => {
  const { id: todoId } = req.params;
  const todo = await Todo.findOne({ _id: todoId });
  if (!todo) {
    res.status(StatusCodes.NOT_FOUND).json(`No TODO with id : ${id}`);
  }
  res.status(StatusCodes.OK).json(todo);
};

const createTodo = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json("Please provide both name and description");
  }
  const todo = await Todo.create({ name, description });
  res.status(StatusCodes.CREATED).json(todo);
};

const updateTodo = async (req, res) => {
  const { id: todoId } = req.params;
  const { name, description, completed } = req.body;
  if (!name || !description || !completed) {
    res.status(StatusCodes.BAD_REQUEST).json("Please provide all the values");
  }
  const todo = await Todo.findOneAndUpdate(
    { _id: todoId },
    { name, description, completed },
    {
      runValidators: true,
      new: true,
    }
  );
  res.status(StatusCodes.OK).json(todo);
};

const deleteTodo = async (req, res) => {
  const { id: todoId } = req.params;
  const todo = await Todo.findOneAndDelete({ _id: todoId });
  if (!todo) {
    res.status(StatusCodes.NOT_FOUND).json(`No TODO with id : ${id}`);
  }
  res.status(StatusCodes.NO_CONTENT).json("TODO deleted succesfully");
};

module.exports = {
  getAllTodos,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
