import React, { useState } from "react";
import styles from "./CreateTodo.module.css";
import axios from "axios";

// alert import
import AsyncAlert from "../../../utils/AsyncAlert";

// react-router imports
import { useNavigate } from "react-router-dom";

const CreateTodo = () => {
  const [todo, setTodo] = useState({});

  const navigate = useNavigate();

  const [response, setResponse] = useState({});
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const createTodo = async () => {
      try {
        const response = await axios.post("/api/v1/todo", todo);
        setResponse((prev) => ({
          ...prev,
          msg: response.data.msg,
          severity: "success",
        }));
      } catch (error) {
        setResponse((prev) => ({
          ...prev,
          msg: error.message,
          severity: "error",
        }));
      }
      setOpen(true);
      setTodo({});
    };
    createTodo();
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatus = ({ target }) => {
    setTodo((prev) => ({
      ...prev,
      completed: target.checked,
    }));
  };

  const changeOpen = () => setOpen(!open);

  return (
    <div className={styles.todoFormContainer}>
      <div className={styles.alertContainer}>
        <AsyncAlert
          message={response.msg}
          severity={response.severity}
          open={open}
          changeOpen={changeOpen}
        />
      </div>
      <form className={styles.todoForm} onSubmit={handleSubmit}>
        <span>Create todo</span>
        <input onChange={handleChange} name="name" value={todo.name || ""} />
        <input
          onChange={handleChange}
          name="description"
          value={todo.description || ""}
        />
        <div className="checkboxWrapper">
          <label htmlFor="status">Status</label>
          <input
            id="status"
            type="checkbox"
            defaultChecked={!!todo.completed}
            onChange={handleStatus}
          />
        </div>
        <div className={styles.formOptions}>
          <button onClick={() => navigate("/")}>back</button>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTodo;
