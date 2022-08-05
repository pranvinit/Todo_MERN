import React, { useEffect, useRef } from "react";
import styles from "./SingleTodo.module.css";

// react-router imports
import { Link } from "react-router-dom";

const SingleTodo = ({ name, description, completed, _id }) => {
  const todoName = useRef(null);
  useEffect(() => {
    if (completed) {
      todoName.current.style.textDecoration = "line-through";
    }
  }, [completed]);
  return (
    <Link to={`/todo/${_id}`} className={styles.todoLink}>
      <div className={styles.todo}>
        <div className={styles.wrapper}>
          <span ref={todoName}>{name}</span>
          <div>
            <span>{description}</span>
            <span id={styles.todoStatus}>
              status: {completed ? "completed" : "not completed"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleTodo;
