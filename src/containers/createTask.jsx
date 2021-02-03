import React, { useCallback, useState } from "react";
import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { requestStart } from "../redux-saga/redux/list";
import { CREATE } from "../redux-saga/redux/constants";

const CreateTask = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleChange = useCallback((ev) => setText(ev.target.value))

  const handleSubmit = (ev) => {
    if (ev.keyCode == 13) {
      dispatch(
        requestStart({
          method: CREATE,
          task: {
            description: text,
          },
        })
      );
      setText('')
    }
  };

  return (
    <TextField
      value={text}
      onChange={handleChange}
      name="text"
      placeholder="Add to list..."
      onKeyDown={handleSubmit}
      fullWidth
      classes={{root: 'create-textfield'}}
    />
  );
};

export default CreateTask;
