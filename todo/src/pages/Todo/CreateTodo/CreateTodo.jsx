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

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const createTodo = async () => {
      try {
        const response = await axios.post("/api/v1/todo", { ...todo });
        setLoading(false);
        setResponse((prev) => ({
          ...prev,
          msg: response.data.msg,
          severity: "success",
        }));
      } catch (error) {
        setLoading(false);
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
      <AsyncAlert
        message={response.msg}
        severity={response.severity}
        open={open}
        changeOpen={changeOpen}
      />
      <form className={styles.todoForm} onSubmit={handleSubmit}>
        <span>Create todo</span>
        <input
          onChange={handleChange}
          placeholder="Name"
          name="name"
          value={todo.name || ""}
          required
        />
        <textarea
          onChange={handleChange}
          placeholder="Description"
          name="description"
          value={todo.description || ""}
          required
          rows="3"
        ></textarea>
        <div className={styles.checkboxWrapper}>
          <label htmlFor="status">Status: </label>
          <input
            id="status"
            type="checkbox"
            defaultChecked={!!todo.completed}
            onChange={handleStatus}
          />
        </div>
        <div className={styles.formOptions}>
          <button className={styles.cancel} onClick={() => navigate("/")}>
            Back
          </button>
          <button type="submit" disabled={loading}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTodo;
