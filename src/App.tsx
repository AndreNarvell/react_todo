import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ListScreen from "./components/ListScreen";
import FocusScreen from "./components/FocusScreen";
import { Task } from "./models/types";
import { shuffle } from "lodash";
import { nanoid } from "nanoid";
import useLocalStorage from "./hooks/use-local-storage";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [focusedTaskId, setFocusedTaskId] = useState<string | undefined>(
    undefined
  );

  const addTask = (task: Pick<Task, "label">) => {
    const id = nanoid();
    setTasks((tasks) => [
      ...tasks,
      { id, label: task.label, isComplete: false },
    ]);
    if (!focusedTaskId) setFocusedTaskId(id);
  };

  const updateTaskCompletion = (taskId: string, isComplete: boolean) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) return { ...task, isComplete };
        return task;
      })
    );
  };

  const focusedTask = tasks.find((task) => task.id === focusedTaskId);

  const shuffleFocusedTask = () => {
    setFocusedTaskId(shuffle(tasks.filter((task) => !task.isComplete))[0]?.id);
  };

  const tasksApi = {
    addTask,
    focusedTask,
    tasks,
    setTasks,
    shuffleFocusedTask,
    updateTaskCompletion,
  };

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
