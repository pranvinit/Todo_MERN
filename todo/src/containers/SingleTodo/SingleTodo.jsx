import React, { useEffect, useState } from "react";
import styles from "./SingleTodo.module.css";

// react-router imports
import { Link } from "react-router-dom";

const SingleTodo = ({ name, description, completed, _id }) => {
  return (
    <Link to={`/todo/${_id}`} className={styles.todoLink}>
      <div className={styles.todo}>
        <span>{name}</span>
        <span>{description}</span>
        <span>{completed.toString()}</span>
      </div>
    </Link>
  );
};

export default SingleTodo;
