import { TasksProps } from "../models/types";

type Props = TasksProps & {};

const FocusScreen: React.FC<Props> = ({ tasks, updateTaskCompletion }) => {
  const task = tasks.filter((task) => !task.isComplete)[0];

  const handleMarkCompleted = () => {
    updateTaskCompletion(task.id, true);
  };

  return task ? (
    <div>
      <div>{task.label}</div>
      <button onClick={handleMarkCompleted}>mark completed</button>
    </div>
  ) : (
    <div>No incomplete tasks</div>
  );
};
export default FocusScreen;
