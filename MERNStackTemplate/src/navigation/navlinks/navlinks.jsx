import React from "react";
import classes from "./navlinks.module.css";

import { useSelector } from "react-redux";
import { useLogout } from "../../hooks/useLogout";

import Button from "../../components/button/button";
import Navlink from "../navlink/navlink";
import {AiOutlineHome,AiOutlineFileAdd} from "react-icons/ai"

const navlinks = () => {
  const { user } = useSelector((state) => state.user);
  const { logout } = useLogout();

  return (
    <div>
      {!user && (
        <ul className={classes.navlinks}>
          <Navlink link="/">Home</Navlink>
          <Navlink link="/Register">Register</Navlink>
          <Navlink link="/Login">Login</Navlink>
          <Navlink link="/ContactUs">Contact Us</Navlink>
          <Navlink link="/OurPolicy">Our Policy</Navlink>
        </ul>
      )}

      {user && (
        <ul className={classes.navlinks}>
          <Navlink link="/Organisation"><AiOutlineHome size={45}/></Navlink>
          <Navlink link="/GrantApplication"><AiOutlineFileAdd size={45}/></Navlink>
          <Button clicked={() => logout()}>Logout - {user.username}</Button>
        </ul>
      )}
    </div>
  );
};

export default navlinks;
