import React from "react";
import classes from "./navbar.module.css";

import Container from "@mui/material/Container";

import logo from '../../assets/logo.png';
import Navlink from "../navlink/navlink";
import Navlinks from "../navlinks/navlinks";
import SidebarToggle from "../sidebarToggle/sidebarToggle";

const navbar = (props) => {
  return (
    <Container maxWidth="lg">
      <header className={classes.navbar}>
        <Navlink link="/">
          <img src={logo} alt="Logo" className={classes.logo}/>
        </Navlink>

        <nav className={classes.links}>
          <Navlinks />
        </nav>

        <SidebarToggle clicked={props.toggleSidebar} />
      </header>
    </Container>
  );
};

export default navbar;
