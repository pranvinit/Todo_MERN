import React, { useState, useEffect } from "react";
import styles from "./TodoList.module.css";
import axios from "axios";

// importing todo page
import SingleTodo from "../SingleTodo/SingleTodo";
// material-ui imports
import { CircularProgress } from "@mui/material";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const getTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/v1/todo");
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTodos();
  }, []);

  if (loading) {
    return (
      <div className={styles.centered}>
        <CircularProgress />
      </div>
    );
  }
  if (!todos.nbHits) {
    return (
      <div className={styles.centered}>
        <span>No todos found</span>
      </div>
    );
  }
  return (
    <div className={styles.todoGrid}>
      {todos.todos?.map((todo) => {
        return <SingleTodo {...todo} key={todo._id} />;
      })}
    </div>
  );
};

export default TodoList;
