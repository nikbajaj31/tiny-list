import { Container, Grid, Table, TableBody } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todoitem from "../components/todoItem";
import { requestStart } from "../redux-saga/redux/list";
import CreateTask from "./createTask";
import "../styles/list.css";

const List = () => {
  const dispatch = useDispatch();
  let { taskList = [] } = useSelector((state) => state.listReducer);

  useEffect(() => {
    dispatch(requestStart());
  }, []);

  return (
    <Container maxWidth="sm">
      <Grid container spacing={3} classes={{ container: "main-grid" }} lg>
        <Grid item lg>
          <CreateTask handleSubmit={() => {}} />
        </Grid>
        <Grid item md>
          <Table size="medium">
            <TableBody>
              {Boolean(taskList.length) &&
                taskList.map((row) => <Todoitem item={row} key={row.id} />)}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Container>
  );
};

export default List;
