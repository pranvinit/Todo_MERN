import React from "react";
import styles from "./Home.module.css";

// container imports
import TodoList from "../../containers/TodoList/TodoList";

// react-router imports
import { useNavigate } from "react-router-dom";

// material-ui imports
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <span className={styles.heading}>your todos</span>
      <TodoList />
      <div id={styles.fabContainer}>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ width: "5rem", height: "5rem" }}
          onClick={() => navigate("/todo/create")}
        >
          <Add fontSize="large" />
        </Fab>
      </div>
    </div>
  );
};

export default Home;
