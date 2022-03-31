import React, { createContext } from "react";
import { Task } from "../models/types";

const TaskContext = createContext<
  [Task[], React.Dispatch<React.SetStateAction<Task[]>>]
>([[], () => {}]);

export default TaskContext;
