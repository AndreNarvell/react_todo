import styled from "styled-components";
import useTaskStore from "../hooks/use-task-store";
import Button from "../Style/Button";
import Spacer from "../Style/Spacer";
import TextButton from "../Style/TextButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Task = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 32px;
  padding-bottom: 45px;
`;

type Props = {};

const FocusScreen: React.FC<Props> = () => {
  const {
    focusedTask: task,
    shuffleFocusedTask,
    updateTaskCompletion,
  } = useTaskStore();

  const handleMarkCompleted = () => {
    if (task) updateTaskCompletion(task.id, true);
  };

  return task ? (
    <Container>
      <Task>{task.label}</Task>
      <Button onClick={handleMarkCompleted}>Mark todo completed</Button>
      <Spacer height={45} />
      <TextButton onClick={shuffleFocusedTask}>switcheroo</TextButton>
    </Container>
  ) : (
    <div>No incomplete tasks</div>
  );
};
export default FocusScreen;
