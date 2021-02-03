import {
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";

const Header = () => (
  <AppBar position="static" color='secondary'>
    <Toolbar>
      <Typography variant="h6" className={"classes.title"}>
        TinyList
      </Typography>
    </Toolbar>
  </AppBar>
);
 export default Header