import React, { ChangeEvent, KeyboardEvent, useContext, useState } from "react";
import styled from "styled-components";
import TaskContext from "../contexts/task-store";
import useTaskStore from "../hooks/use-task-store";
import DeleteIcon from "../icons/DeleteIcon";
import { Task } from "../models/types";
import Checkbox from "../Style/Checkbox";
import IconButton from "../Style/IconButton";
import Spacer from "../Style/Spacer";
import TextButton from "../Style/TextButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 460px;
`;

const List = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 45px 24px;
`;

const ListItem = styled.label`
  align-items: center;
  display: flex;
  padding: 4px 0;
  font-size: 18px;
  /* cursor: pointer; */
`;

const DeleteButton = styled(IconButton)`
  visibility: hidden;
  ${ListItem}:hover & {
    visibility: visible;
  }
`;

const Input = styled.input`
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border-radius: 15px;
  border: none;
  padding: 20px 24px;
`;

type Props = {};

const ListScreen: React.FC<Props> = () => {
  const { addTask, tasks, setTasks, updateTaskCompletion } = useTaskStore();
  // const value = useContext(TaskContext);

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
    <Container>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <Checkbox
              checked={task.isComplete}
              onChange={handleCompleteChange(task)}
            />
            <Spacer width={24} />

            {task.label}
            <Spacer flex={1} />
            <DeleteButton onClick={handleTaskDeleteClick(task)}>
              <DeleteIcon />
            </DeleteButton>
          </ListItem>
        ))}
      </List>

      <Spacer height={30} />

      <Input
        placeholder="Add a new todo"
        value={newTaskLabel}
        onChange={handleNewTaskLabelChange}
        onKeyPress={handleNewTaskKeyPress}
      />
      <Spacer height={45} />

      <TextButton onClick={handleClearClick} style={{ alignSelf: "center" }}>
        clear completed
      </TextButton>
    </Container>
  );
};

export default ListScreen;
