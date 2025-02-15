import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { UpdateTaskForm } from "./UpdateTaskForm";
import classnames from "classnames";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import axios from "axios";

export const Task = ({ task, fetchTasks }) => {
  const { id, name, completed } = task;
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setisDialogOpen] = useState(false);

  const handleUpdateTaskCompletion = async () => {
    try {
      await axios.put(API_URL, {
        id,
        name,
        completed: !isComplete,
      });
      setIsComplete((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${API_URL}/${task.id}`);
      await fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className={classnames("flex", { done: isComplete })}>
        <Checkbox
          checked={isComplete}
          on
          onChange={handleUpdateTaskCompletion}
        />
        <Typography variant="h4">{name}</Typography>
      </div>

      <div className="taskButtons">
        <Button variant="contained" onClick={() => setisDialogOpen(true)}>
          <EditIcon />
        </Button>
        <Button color="error" variant="contained" onClick={handleDeleteTask}>
          <DeleteIcon />
        </Button>
      </div>

      <UpdateTaskForm
        fetchTasks={fetchTasks}
        isDialogOpen={isDialogOpen}
        setisDialogOpen={setisDialogOpen}
        task={task}
      />
    </div>
  );
};
