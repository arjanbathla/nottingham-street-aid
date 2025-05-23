import React from "react";
import classes from "./navlinks.module.css";

import { useSelector } from "react-redux";
import { useLogout } from "../../hooks/useLogout";
import { useAdminLogout } from "../../hooks/useAdminLogout";

import Button from "../../components/button/button";
import Navlink from "../navlink/navlink";
import { AiOutlineHome, AiOutlineFileAdd } from "react-icons/ai";
import { MdOutlinePolicy } from "react-icons/md";

const navlinks = () => {
  const { user } = useSelector((state) => state.user);
  const { admin } = useSelector((state) => state.admin);
  const { logout } = useLogout();
  const { adminLogout } = useAdminLogout();

  return (
    <div>
      {!user && !admin && (
        <ul className={classes.navlinks}>
          <Navlink link="/">Home</Navlink>
          <Navlink link="/Register">Register</Navlink>
          <Navlink link="/Login">Login</Navlink>
          <Navlink link="/OurPolicy">Policies & Guidance</Navlink>
          <Navlink link="/ContactUs">Contact Us</Navlink>
        </ul>
      )}

      {user && (
        <ul className={classes.navlinks}>
          <Navlink link="/Profile">Profile</Navlink>
          <Navlink link="/Organisation">
            <AiOutlineHome /> Dashboard
          </Navlink>
          <Navlink link="/GrantApplication">
            <AiOutlineFileAdd /> New Grant
          </Navlink>
          <Navlink link="/OurPolicy">
            <MdOutlinePolicy /> Policies & Guidance
          </Navlink>
          <Button clicked={() => logout()}>Logout - {user.username}</Button>
        </ul>
      )}

      {admin && (
        <ul className={classes.navlinks}>
          <Navlink link="/Admin">
            <AiOutlineHome /> Dashboard
          </Navlink>
          <Navlink link="/OurPolicy">
            <MdOutlinePolicy /> Policies & Guidance
          </Navlink>
          <Button clicked={() => adminLogout()}>Logout - {admin.username}</Button>
        </ul>
      )}
    </div>
  );
};

export default navlinks;
