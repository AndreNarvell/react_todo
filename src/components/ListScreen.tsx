import React, { ChangeEvent, KeyboardEvent, useContext, useState } from "react";
import TaskContext from "../contexts/task-store";
import useTaskStore from "../hooks/use-task-store";
import { Task } from "../models/types";

type Props = {};

const ListScreen: React.FC<Props> = () => {
  const { addTask, tasks, setTasks, updateTaskCompletion } = useTaskStore();
  const value = useContext(TaskContext);

  const [newTaskLabel, setNewTaskLabel] = useState("");

  const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskLabel(e.target.value);

  const handleNewTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTaskLabel !== "") {
      addTask({ label: newTaskLabel });
      setNewTaskLabel("");
    }
  };

  const handleCompleteChange =
    (task: Task) => (e: ChangeEvent<HTMLInputElement>) => {
      updateTaskCompletion(task.id, e.target.checked);
    };

  const handleTaskDeleteClick = (handleTask: Task) => () => {
    setTasks((tasks) => tasks.filter((task) => task.id !== handleTask.id));
  };

  const handleClearClick = () =>
    setTasks((tasks) => tasks.filter((task) => !task.isComplete));

  return (
    <div>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            {" "}
            <input
              type="checkbox"
              checked={task.isComplete}
              onChange={handleCompleteChange(task)}
            />{" "}
            {task.label}
            <button onClick={handleTaskDeleteClick(task)}>delete</button>
          </div>
        ))}
      </div>
      <input
        value={newTaskLabel}
        onChange={handleNewTaskLabelChange}
        onKeyPress={handleNewTaskKeyPress}
      />
      <div>
        <button onClick={handleClearClick}>clear completed</button>
      </div>
    </div>
  );
};

export default ListScreen;
