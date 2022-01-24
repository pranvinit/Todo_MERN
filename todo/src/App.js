import styles from "./App.module.css";

// react-router imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// page imports
import Home from "./pages/Home/Home";
import CreateTodo from "./pages/Todo/CreateTodo/CreateTodo";
import ManageTodo from "./pages/Todo/ManageTodo/ManageTodo";

// common imports
import Navbar from "./pages/Common/Navbar";
import Footer from "./pages/Common/Footer";

function App() {
  return (
    <div className={styles.container}>
      <Router>
        <Navbar />
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo/create" element={<CreateTodo />} />
            <Route path="/todo/:id" element={<ManageTodo />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
