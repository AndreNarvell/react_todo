import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ListScreen from "./components/ListScreen";
import FocusScreen from "./components/FocusScreen";
import { Task } from "./models/types";
import useLocalStorage from "./hooks/use-local-storage";
import TaskContext from "./contexts/task-store";
import styled from "styled-components";
import { colors, GlobalStyle } from "./styles";

const Layout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 35px;
`;

const Nav = styled.nav`
  display: flex;
  margin-bottom: 45px;
`;

const TabButton = styled(NavLink)`
  align-items: center;
  background: #000;
  color: #fff;
  display: flex;
  height: 62px;
  justify-content: center;
  text-decoration: none;
  width: 120px;

  &:first-child {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }

  &:last-child {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  &.active {
    background: ${colors.primary};
    color: #000;
  }

  &:hover {
    text-decoration: underline;
  }
`;

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <TaskContext.Provider value={[tasks, setTasks]}>
          <Layout>
            <Nav>
              <TabButton
                to="/"
                className={(navData) => (navData.isActive ? "active" : "")}
              >
                Todos
              </TabButton>
              <TabButton
                to="/focus"
                className={(navData) => (navData.isActive ? "active" : "")}
              >
                Focus
              </TabButton>
            </Nav>

            <Routes>
              <Route path="/" element={<ListScreen />} />
              <Route path="/focus" element={<FocusScreen />} />
            </Routes>
          </Layout>
        </TaskContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
