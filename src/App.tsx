import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ListScreen from "./components/ListScreen";
import FocusScreen from "./components/FocusScreen";
import { Task } from "./models/types";

import useLocalStorage from "./hooks/use-local-storage";

import TaskContext from "./contexts/task-store";

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  return (
    <div>
      <BrowserRouter>
        <TaskContext.Provider value={[tasks, setTasks]}>
          <nav>
            <NavLink to="/">List</NavLink> {""} - {""}
            <NavLink to="/focus">Focus</NavLink>
          </nav>
          <Routes>
            <Route path="/" element={<ListScreen />} />
            <Route path="/focus" element={<FocusScreen />} />
          </Routes>
        </TaskContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
