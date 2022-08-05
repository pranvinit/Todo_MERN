import React, { useState, useEffect } from "react";
import styles from "./ManageTodo.module.css";
import axios from "axios";

// alert import
import AsyncAlert from "../../../utils/AsyncAlert";
import { Spinner } from "../../../components/spinner/Spinner";

// react-router imports
import { useParams, useNavigate } from "react-router-dom";

const ManageTodo = () => {
  const [todo, setTodo] = useState({});
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const getTodo = async () => {
    setLoading(true);
    const response = await axios.get(`/api/v1/todo/${id}`);
    setTodo(response.data.todo);
    setLoading(false);
  };

  useEffect(() => {
    getTodo();
  }, []);

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

  const [response, setResponse] = useState({});
  const [open, setOpen] = useState(false);

  const changeOpen = () => setOpen(!open);

  const handleUpdate = (e) => {
    e.preventDefault();

    setIsActive(true);
    const updateTodo = async () => {
      try {
        const response = await axios.patch(`/api/v1/todo/${id}`, todo);
        setIsActive(false);
        setResponse((prev) => ({
          ...prev,
          msg: response.data.msg,
          severity: "success",
        }));
      } catch (error) {
        setIsActive(false);
        setResponse((prev) => ({
          ...prev,
          msg: error.message,
          severity: "error",
        }));
      }
      setOpen(true);
    };
    updateTodo();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const deleteTodo = async () => {
      try {
        await axios.delete(`/api/v1/todo/${id}`);
        navigate("/");
      } catch (error) {
        setResponse((prev) => ({
          ...prev,
          msg: error.message,
          severity: "error",
        }));
      }
      setOpen(true);
    };
    deleteTodo();
  };

  if (loading) {
    return (
      <div className={styles.centered}>
        <Spinner />
      </div>
    );
  }
  return (
    <div className={styles.todoFormContainer}>
      <AsyncAlert
        message={response.msg}
        severity={response.severity}
        open={open}
        changeOpen={changeOpen}
      />
      <form className={styles.todoForm}>
        <span>Manage todo</span>
        <input
          name="name"
          onChange={handleChange}
          value={todo.name || ""}
          required
        />
        <textarea
          name="description"
          onChange={handleChange}
          value={todo.description || ""}
          rows="3"
          required
        ></textarea>
        <div className={styles.checkboxWrapper}>
          <label htmlFor="status">Status: </label>
          <input
            id="status"
            type="checkbox"
            defaultChecked={!!todo.completed}
            onClick={handleStatus}
          />
        </div>
        <div className={styles.formOptions}>
          <button
            onClick={handleDelete}
            className={styles.delete}
            disabled={isActive}
          >
            Delete
          </button>
          <button onClick={handleUpdate} disabled={isActive}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageTodo;
