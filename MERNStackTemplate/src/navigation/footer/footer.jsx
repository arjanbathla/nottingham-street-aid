import React from "react";
import classes from "./footer.module.css";

import Container from "@mui/material/Container";
import Navlink from "../navlink/navlink";
import { CURRENT_YEAR } from "../../config";

const footer = () => {
  return (
    <Container maxWidth="lg">
      <footer className={classes.footer}>
        <div className={classes.links}>
          <Navlink link="/">Home</Navlink>
          <Navlink link="/Register">Register</Navlink>
          <Navlink link="/Login">Login</Navlink>
          <Navlink link="/ContactUs">Contact Us</Navlink>
          <Navlink link="/OurPolicy">Our Policy</Navlink>
        </div>
        <div className={classes.rights}>
          <p>@ {CURRENT_YEAR} All Rights Reserved</p>
          <p>Developed By NSA DEVS</p>
        </div>
      </footer>
    </Container>
  );
};

export default footer;
