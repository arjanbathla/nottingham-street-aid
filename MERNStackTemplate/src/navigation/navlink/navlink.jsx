import React from 'react'
import classes from "./navlink.module.css"

import { NavLink } from 'react-router-dom';

const navlink = (props) => {
  return (
    <div>
      <li className={classes.navlink}>
        <NavLink to={props.link} className={({ isActive }) => (isActive ? classes.active : '')}>
          {props.children}
        </NavLink>
      </li>
    </div>
  )
}

export default navlink