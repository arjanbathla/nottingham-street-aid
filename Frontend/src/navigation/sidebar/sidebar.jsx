import React from "react";
import classes from "./sidebar.module.css";

import Container from "@mui/material/Container";

import Navlinks from "../navlinks/navlinks";
import Backdrop from "../../components/backdrop/backdrop";

const sidebar = (props) => {
  let attachedClasses = [classes.sidebar, classes.close];
  if (props.open) {
    attachedClasses = [classes.sidebar, classes.open];
  }

  return (
    <Container maxWidth="sm">
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <nav>
          <Navlinks/>
        </nav>
      </div>
    </Container>
  );
};

export default sidebar;
