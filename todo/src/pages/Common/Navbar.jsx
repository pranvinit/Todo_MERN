import React from "react";
import styles from "./Common.module.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src="/logo/todo.png" alt="logo" onClick={() => navigate("/")} />
      </div>
      <span>TODO</span>
    </div>
  );
};

export default Navbar;
