import React from "react";
import styles from "./Home.module.css";

// container imports
import TodoList from "../../containers/TodoList/TodoList";

const Home = () => {
  return (
    <div>
      <h1>This is the homepage of my application</h1>
      <TodoList />
    </div>
  );
};

export default Home;
