import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListScreen from "./components/ListScreen";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListScreen />} />
          <Route path="/focus" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
