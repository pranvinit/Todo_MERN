import React, { useEffect, useState } from "react";
import styles from "./SingleTodo.module.css";

// react-router imports
import { Link } from "react-router-dom";

const SingleTodo = ({ name, description, completed, _id }) => {
  return (
    <Link to={`/todo/${_id}`} className={styles.todoLink}>
      <div className={styles.todo}>
        <span>{name}</span>
        <div>
          <span>{description}</span>
          <span id={styles.todoStatus}>
            status: {completed ? "completed" : "not completed"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SingleTodo;
