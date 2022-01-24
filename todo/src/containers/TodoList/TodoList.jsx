import React, { useState, useEffect } from "react";
import styles from "./TodoList.module.css";
import axios from "axios";

// importing todo page
import SingleTodo from "../SingleTodo/SingleTodo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const getTodos = async () => {
    try {
      const response = await axios.get("/api/v1/todo");
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  if (!todos.nbHits) {
    return <h1>No todos found</h1>;
  }
  return (
    <div className={styles.todoGrid}>
      {todos.todos.map((todo) => {
        return <SingleTodo {...todo} key={todo._id} />;
      })}
    </div>
  );
};

export default TodoList;
