import styles from "./asyncAlert.module.css";
const AsyncAlert = ({ message, severity, open, changeOpen }) => {
  return (
    <div
      className={`${styles.alert} ${!open && styles.collapse} ${
        severity === "success" ? styles.success : styles.error
      }`}
    >
      <img
        src={`/assets/${severity === "success" ? "success" : "error"}.png`}
        alt={severity}
      />
      <span>{message}</span>
      <img src="/assets/close.png" alt="close" onClick={() => changeOpen()} />
    </div>
  );
};
export default AsyncAlert;
