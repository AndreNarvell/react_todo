import { TasksProps } from "../models/types";

type Props = TasksProps & {};

const FocusScreen: React.FC<Props> = ({ tasks }) => {
  const task = tasks[0];

  return task ? <div>{task.label}</div> : <div>No focus tasks</div>;
};
export default FocusScreen;
