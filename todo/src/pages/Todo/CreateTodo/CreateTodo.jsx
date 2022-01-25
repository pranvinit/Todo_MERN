import React, { useState } from "react";
import styles from "./CreateTodo.module.css";
import axios from "axios";

// alert import
import AsyncAlert from "../../../utils/AsyncAlert";

// react-router imports
import { useNavigate } from "react-router-dom";

// material-ui imports
import { TextField, Checkbox, FormControlLabel, Button } from "@mui/material";

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

  const handleComplete = () => {
    setTodo((prev) => ({
      ...prev,
      completed: !todo.completed,
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
        <TextField
          fullWidth
          label="NAME"
          name="name"
          variant="outlined"
          onChange={handleChange}
          value={todo.name || ""}
        />
        <TextField
          fullWidth
          label="DESCRIPTION"
          name="description"
          variant="outlined"
          onChange={handleChange}
          value={todo.description || ""}
        />
        <FormControlLabel
          control={<Checkbox checked={todo.completed || false} />}
          label="COMPLETED"
          onClick={handleComplete}
        />
        <div className={styles.formOptions}>
          <Button
            variant="outlined"
            color="warning"
            sx={{ width: 200, mx: 3 }}
            onClick={() => navigate("/")}
          >
            back
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ width: 200, mx: 3 }}
            type="submit"
          >
            create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTodo;
