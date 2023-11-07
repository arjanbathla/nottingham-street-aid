import React from 'react';
import classes from './button2.module.css';

const button2 = (props) => {
  return (
    <button className={classes.button} onClick={props.clicked} disabled={props.disabled}>
        {props.children}
    </button>
  )
}

export default button2;