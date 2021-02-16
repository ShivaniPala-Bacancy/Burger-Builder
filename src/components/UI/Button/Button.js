import React from 'react';
import styles from './Button.module.css';

const button =(props) =>{
    let classes=[];
    classes.push(styles.Button);
    classes.push(styles[props.btnType]);
    if(props.disabled){
        // classes=[];
        classes.push(styles.Disabled);
    }
    return (
        <button
            disabled={props.disabled}
            className={classes.join(" ")}
            onClick={props.clicked}> {props.children} </button>
    )
}

export default button;