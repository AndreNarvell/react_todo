import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ListScreen from "./components/ListScreen";
import FocusScreen from "./components/FocusScreen";
import { useState } from "react";
import { Task } from "./models/types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const tasksProps = { tasks, setTasks };

  return (
    <div>
      <BrowserRouter>
        <nav>
          <NavLink to="/">List</NavLink>
          <NavLink to="/focus">Focus</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<ListScreen {...tasksProps} />} />
          <Route path="/focus" element={<FocusScreen {...tasksProps} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
