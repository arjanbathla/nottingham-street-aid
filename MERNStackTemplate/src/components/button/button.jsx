import React from 'react';
import classes from './button.module.css';

const button = (props) => {
  return (
    <button className={classes.button} onClick={props.clicked} disabled={props.disabled}>
        {props.children}
    </button>
  )
}

export default button;