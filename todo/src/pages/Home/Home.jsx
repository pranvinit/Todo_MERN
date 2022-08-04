import React from "react";
import styles from "./Home.module.css";

// container imports
import TodoList from "../../containers/TodoList/TodoList";

// react-router imports
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className={styles.heading}>Your Todos</h2>
      <TodoList />
      <div id={styles.create} onClick={() => navigate("/todo/create")}>
        <img src="assets/add.png" alt="add" />
      </div>
    </div>
  );
};

export default Home;
