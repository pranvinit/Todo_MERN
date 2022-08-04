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

  const handleUpdate = () => {
    const updateTodo = async () => {
      try {
        const response = await axios.patch(`/api/v1/todo/${id}`, todo);
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
    };
    updateTodo();
  };

  const handleDelete = () => {
    const deleteTodo = async () => {
      try {
        const response = await axios.delete(`/api/v1/todo/${id}`);
        console.log(response.data.msg);
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
      setTimeout(() => {
        navigate("/");
      }, 2000);
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
      <div className={styles.alertContainer}>
        <AsyncAlert
          message={response.msg}
          severity={response.severity}
          open={open}
          changeOpen={changeOpen}
        />
      </div>
      <form className={styles.todoForm}>
        <span>Update or delete todo</span>
        <input name="name" onChange={handleChange} value={todo.name} />
        <textarea
          name="description"
          onChange={handleChange}
          value={todo.description}
        ></textarea>
        <div className="checkboxWrapper">
          <label htmlFor="status">Status</label>
          <input
            id="status"
            type="checkbox"
            defaultChecked={!!todo.completed}
            onClick={handleStatus}
          />
        </div>
        <div className={styles.formOptions}>
          <button onClick={handleDelete}>delete</button>
          <button onClick={handleUpdate}>update</button>
        </div>
      </form>
    </div>
  );
};

export default ManageTodo;
