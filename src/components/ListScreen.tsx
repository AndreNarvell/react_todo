import { nanoid } from "nanoid";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Task, TasksProps } from "../models/types";

type Props = TasksProps & {};

const ListScreen: React.FC<Props> = ({ tasks, setTasks }) => {
  const [newTaskLabel, setNewTaskLabel] = useState("");

  const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskLabel(e.target.value);

  const handleNewTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTaskLabel !== "") {
      setTasks((tasks) => [
        ...tasks,
        { id: nanoid(), label: newTaskLabel, isComplete: false },
      ]);
      setNewTaskLabel("");
    }
  };

  const handleCompleteChange =
    (handledTask: Task) => (e: ChangeEvent<HTMLInputElement>) => {
      setTasks((tasks) =>
        tasks.map((task) => {
          if (task.id === handledTask.id)
            return { ...task, isComplete: e.target.checked };
          return task;
        })
      );
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