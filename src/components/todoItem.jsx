import {
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  TextField,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "@material-ui/icons";
import {
  UPDATE,
  COMPLETED,
  UNCOMPLETED,
  DELETE,
  UPDATETASK,
} from "../redux-saga/redux/constants";
import { requestStart } from "../redux-saga/redux/list";
import "../styles/list.css";

const List = ({ item }) => {
  const dispatch = useDispatch();
  const [editTask, setEdittask] = useState(false);
  const [taskText, setTaskText] = useState(item.description);
  const [checkbox, setCheckbox] = useState(item.completed_at || null);

  const handleCheckBox = useCallback(() => {
    setCheckbox((state) => {
      dispatch(
        requestStart({
          method: UPDATE,
          data: {
            id: item.id,
            action: state ? UNCOMPLETED : COMPLETED,
          },
        })
      );
      return !state;
    });
  }, [item.id]);

  const handleDeleteTask = useCallback(() => {
    dispatch(
      requestStart({
        method: DELETE,
        taskId: item.id,
      })
    );
  }, [item.id]);

  const handleEditTaskText = useCallback((ev) => {
    setTaskText(() => ev.target.value);
  }, []);

  const handleEditTask = useCallback(() => {
    setEdittask((state) => !state);
  }, []);

  const handleSubmit = (ev) => {
    if (ev.keyCode == 13) {
      handleUpdateTask();
    }
  };

  const handleUpdateTask = () => {
    dispatch(
      requestStart({
        method: UPDATE,
        data: {
          action: UPDATETASK,
          task: {
            id: item.id,
            description: taskText,
          },
        },
      })
    );
    setEdittask(false);
  };

  return (
    <TableRow
      hover
      key={item.id}
    >
      <TableCell padding="checkbox" classes={{ root: "list-item" }}>
        <Checkbox
          checked={checkbox}
          onChange={handleCheckBox}
          value={checkbox}
        />
      </TableCell>
      <TableCell
        padding="none"
        onClick={handleEditTask}
        classes={{ root: "list-item" }}
      >
        {editTask ? (
          <TextField
            value={taskText}
            onChange={handleEditTaskText}
            onKeyDown={handleSubmit}
            autoFocus={editTask}
            onBlur={handleUpdateTask}
          />
        ) : (
          taskText
        )}
      </TableCell>
      <TableCell align="right" classes={{ root: "list-item" }}>
        <IconButton onClick={handleDeleteTask}>
          <Delete color="secondary" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default List;
