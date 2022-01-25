import React, { useState, useEffect } from "react";
import styles from "./ManageTodo.module.css";
import axios from "axios";

// alert import
import AsyncAlert from "../../../utils/AsyncAlert";

// react-router imports
import { useParams, useNavigate } from "react-router-dom";

// material-ui imports
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
} from "@mui/material";

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

  const handleComplete = () => {
    setTodo((prev) => ({
      ...prev,
      completed: !todo.completed,
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
        <CircularProgress />
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
        <TextField
          fullWidth
          label="NAME"
          name="name"
          variant="outlined"
          onChange={handleChange}
          value={todo.name}
        />
        <TextField
          fullWidth
          label="DESCRIPTION"
          name="description"
          variant="outlined"
          onChange={handleChange}
          value={todo.description}
        />
        <FormControlLabel
          control={<Checkbox checked={todo.completed} />}
          label="COMPLETED"
          onClick={handleComplete}
        />
        <div className={styles.formOptions}>
          <Button
            variant="outlined"
            color="error"
            sx={{ width: 200, mx: 3 }}
            onClick={handleDelete}
          >
            delete
          </Button>
          <Button
            variant="outlined"
            sx={{ width: 200, mx: 3 }}
            onClick={handleUpdate}
          >
            update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ManageTodo;
