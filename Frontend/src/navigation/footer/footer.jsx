import React from "react";
import classes from "./footer.module.css";

import { useSelector } from "react-redux";

import Container from "@mui/material/Container";
import Navlink from "../navlink/navlink";
import Button from "../../components/button/button";

import { CURRENT_YEAR } from "../../config";

import { AiOutlineHome, AiOutlineFileAdd } from "react-icons/ai";
import { MdOutlinePolicy } from "react-icons/md";

const footer = () => {
  const { user } = useSelector((state) => state.user);
  const { admin } = useSelector((state) => state.admin);

  return (
    <Container maxWidth="lg">
      <footer className={classes.footer}>
        {!user && !admin && (
          <div className={classes.links}>
            <Navlink link="/">Home</Navlink>
            <Navlink link="/Register">Register</Navlink>
            <Navlink link="/Login">Login</Navlink>
            <Navlink link="/OurPolicy">Policies & Guidance</Navlink>
            <Navlink link="/ContactUs">Contact Us</Navlink>
            <Navlink link="/FAQ">FAQ</Navlink>
          </div>
        )}

        {user && (
          <div className={classes.links}>
            <Navlink link="/Organisation">
              <AiOutlineHome /> Dashboard
            </Navlink>
            <Navlink link="/GrantApplication">
              <AiOutlineFileAdd /> New Grant
            </Navlink>
            <Navlink link="/OurPolicy">
              <MdOutlinePolicy /> Policies & Guidance
            </Navlink>
          </div>
        )}

        {admin && (
          <div className={classes.links}>
            <Navlink link="/Admin">
              <AiOutlineHome /> Dashboard
            </Navlink>
            <Navlink link="/OurPolicy">
              <MdOutlinePolicy /> Policies & Guidance
            </Navlink>
          </div>
        )}

        <div className={classes.rights}>
          <p>@ {CURRENT_YEAR} All Rights Reserved</p>
          <p>Developed By NSA DEVS</p>
        </div>
      </footer>
    </Container>
  );
};

export default footer;
