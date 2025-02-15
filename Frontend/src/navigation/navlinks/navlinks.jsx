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
              <Navlink link="/FAQ">FAQ</Navlink> {/* No icon here */}
            </ul>
        )}

        {user && (
            <ul className={classes.navlinks}>
              <Navlink link="/Organisation">
                Dashboard
              </Navlink>
              <Navlink link="/GrantApplication">
                New Grant
              </Navlink>
              <Navlink link="/OurPolicy">
                Policies & Guidance
              </Navlink>
              <Navlink link="/FAQ">FAQ</Navlink> {/* No icon here */}
              <Button clicked={() => logout()}>Logout - {user.username}</Button>
            </ul>
        )}

        {admin && (
            <ul className={classes.navlinks}>
              <Navlink link="/Admin">
                Dashboard
              </Navlink>
              <Navlink link="/OurPolicy">
                Policies & Guidance
              </Navlink>
              <Navlink link="/FAQ">FAQ</Navlink> {/* No icon here */}
              <Button clicked={() => adminLogout()}>Logout - {admin.username}</Button>
            </ul>
        )}
      </div>
  );
};

export default navlinks;
