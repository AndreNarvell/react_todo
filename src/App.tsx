import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ListScreen from "./components/ListScreen";
import FocusScreen from "./components/FocusScreen";
import { useState } from "react";
import { Task } from "./models/types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const updateTaskCompletion = (taskId: string, isComplete: boolean) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) return { ...task, isComplete };
        return task;
      })
    );
  };

  const tasksApi = { tasks, setTasks, updateTaskCompletion };

  return (
    <div>
      <BrowserRouter>
        <nav>
          <NavLink to="/">List</NavLink>
          <NavLink to="/focus">Focus</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<ListScreen {...tasksApi} />} />
          <Route path="/focus" element={<FocusScreen {...tasksApi} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
